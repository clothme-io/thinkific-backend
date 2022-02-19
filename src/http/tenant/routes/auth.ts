import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import axios from "axios";
import { getRepository } from "typeorm";
import { Tenant } from "../../../entity/Tenant";
import { Session } from "../../../entity/Session";

const router = express.Router();

// const roles = ["Site Owners", "Site Admins", "Partners"];
const state = process.env.THINKIFIC_STATE;
const redirect_uri =
  "http://localhost:8080/app/thinkific-linkedIn-badge/oauth/callback";
const client_id = process.env.THINKIFIC_CLIENT_ID;
const client_secret = process.env.THINKIFIC_CLIENT_SECRET;
const accessScope = "openid profile email site write:site_scripts";

// SignUp
router.get(
  `/thinkific-linkedIn-badge/install`,
  async (req: Request, res: Response, next: NextFunction) => {
    const subDomainParams = req.query.subdomain;
    res.redirect(
      `https://${subDomainParams}.thinkific.com/oauth2/consent?client_id=${client_id}&redirect_uri=${redirect_uri}&response_mode=query&response_type=code&scope=${accessScope}&state=${state}`
    );
  }
);

// Sign In
router.get(
  "/thinkific-linkedIn-badge/oauth/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    // get authorization code from request
    const code = req.query.code as string;
    const domain = req.query.subdomain;
    const state = req.query.state;
    // The user did not give us permission.
    if (!code || !domain || !state) {
      return res.redirect("https://thesi.app/");
    }

    // Tenant & Session
    const tenatRepo = getRepository(Tenant);
    const sessionRepo = getRepository(Session);

    try {
      const responseData = await axios.post(
        `https://${domain}.thinkific.com/oauth2/token`,
        {
          grant_type: "authorization_code",
          code: `${code}`,
        },
        {
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(client_id + ":" + client_secret).toString("base64"),
          },
        }
      );
      let options = {
        httpOnly: true, // The cookie only accessible by the web server
      };

      const tenantRes = tenatRepo.create({
        shortId: responseData.data.gid,
        subdomain: domain as string,
        uuid: responseData.data.gid,
        gid: responseData.data.gid,
      });
      await tenantRes.save();

      const sessionRes = sessionRepo.create({
        shortId: tenantRes.shortId,
        uuid: tenantRes.shortId,
        refreshToken: responseData.data.refresh_token,
        accesToken: responseData.data.access_token,
        expiresAt: responseData.data.expires_in,
        tenant: tenantRes,
      });
      await sessionRes.save();

      res.cookie("linkdIn_app", responseData.data.refresh_token, options);
      return res.redirect(`https://${domain}.thinkific.com/manage/apps`);
    } catch (error) {
      return res.send({ error: error });
    }
  }
);

router.get(
  "/refresh-token",
  async (req: Request, res: Response, next: NextFunction) => {}
);

router.get(
  "/check-tenant-exist",
  async (req: Request, res: Response, next: NextFunction) => {
    // get authorization code from request
    const tgidCode = req.query.tgid as string;

    // Tenant
    const tenatRepo = getRepository(Tenant);
    const sessionRepo = getRepository(Session);

    try {
      const tenantRes = await tenatRepo.findOne({
        where: { shortId: tgidCode },
      });
      const sessionRes = await sessionRepo.findOne({
        where: { tenant: tenantRes },
      });
      // console.log("Tenant Exist", sessionRes);
      return res.send({ tenant: tenantRes, session: sessionRes });
    } catch (error) {
      return res.send(error);
    }
  }
);

export { router };
