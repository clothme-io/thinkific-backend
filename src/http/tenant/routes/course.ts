import express, { NextFunction, Request, Response } from "express";
import axiosClient from "../../common/axiosConfig";
import { getRepository } from "typeorm";
import { Course } from "../../../entity/Course";
import { Tenant } from "../../../entity/Tenant";
import { Session } from "../../../entity/Session";
import { refreshToken } from "../utils/utils";

const router = express.Router();

const state = process.env.THINKIFIC_STATE;
const redirect_uri =
  "http://localhost:5000/app/thinkific-linkedIn-badge/oauth/callback";
const client_id = process.env.THINKIFIC_CLIENT_ID;
const client_secret = process.env.THINKIFIC_CLIENT_SECRET;

// Create
router.get(
  "/get-all-course",
  async (req: Request, res: Response, next: NextFunction) => {
    const tenantGid = req.query.tenantGid;
    if (!tenantGid) {
      return res.status(400).send({ message: "Missing Tenant GID Value" });
    }
    // const courseRepo = getRepository(Course);
    const tenantRepo = getRepository(Tenant);
    const sessionRepo = getRepository(Session);

    try {
      const tenantRes = await tenantRepo.findOne({
        where: { shortId: tenantGid },
      });

      if (!tenantRes) {
        return res.status(400).send({ message: "Tenant does not exist" });
      }
      // const courseRes = await courseRepo.findOne({
      //   where: { tenant: tenantRes },
      // });

      const sessionRes = await sessionRepo.findOne({
        where: { tenant: tenantRes },
      });
      // console.log("sessionRes Res: =====", sessionRes);
      let access_token = "";
      if (sessionRes) {
        access_token = sessionRes.accesToken;
      }

      try {
        const remoteCourses = await axiosClient.get(
          "/courses?page=1&limit=25",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = remoteCourses.data;
        return res.send({ courses: responseData });
      } catch (error: any) {
        // console.log("Courses ====", error.response);
        if (
          error.response.status === 401 ||
          error.response.statusText == "Unauthorized"
        ) {
          console.log(
            "client_secret",
            tenantRes.subdomain,
            sessionRes?.refreshToken,
            client_id,
            client_secret
          );
          const tokenData = await refreshToken(
            tenantRes.subdomain,
            sessionRes?.refreshToken as string,
            client_id as string,
            client_secret as string
          );
          console.log("tokenData ===", tokenData);
          await sessionRepo.update(
            { shortId: sessionRes?.shortId },
            {
              accesToken: tokenData.access_token,
              refreshToken: tokenData.refresh_token,
              expiresAt: tokenData.expires_in,
            }
          );

          try {
            const remoteCourses = await axiosClient.get(
              "/courses?page=1&limit=25",
              {
                headers: {
                  Authorization: `Bearer ${tokenData.access_token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const responseData = remoteCourses.data;
            return res.send({ courses: responseData });
          } catch (error: any) {
            return res.status(500).send({
              errorMessage: `${error.code} - ${error.message}`,
            });
          }
        }
      }
      return res.json();
    } catch (error: any) {
      return res.status(500).send({
        errorMessage: `${error.code} - ${error.message}`,
      });
    }
  }
);

// Update
router.patch(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {}
);

export { router };
