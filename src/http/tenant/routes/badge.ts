import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Course } from "../../../entity/Course";
import { Badge } from "../../../entity/Badge";
import {
  checkIfEmployeeTenantExist,
  checkIfEmployeeTenantExist2,
} from "../utils/checkDB";
import { nanoid } from "nanoid";
import { v4 as uuid } from "uuid";
var crypto = require("crypto");

const router = express.Router();

// Add A Brand: Can only be done by Employee with the right role and duties.
router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  console.log("data body", data);

  const courseRepo = getRepository(Course);
  const badgeRepo = getRepository(Badge);

  try {
    const courseRes = await courseRepo.findOne({
      where: { shortId: data.cid },
    });
    const badgeRes = badgeRepo.create({
      courseName: data.courseName,
      certId: data.certId,
      issueMonthOrYear: data.issueMonthOrYear,
      certificateName: data.certificateName,
      expirationMonthOrYear: data.expirationMonthOrYear,
      organizationId: data.organizationId,
      organizationName: data.organizationName,
      course: courseRes,
    });
    await badgeRes.save();

    return res.send({ course: badgeRes });
  } catch (error) {
    return res.send({ error: error });
  }
});

// Update: To Attach Locations To Brand
router.post(
  "/attach-location-to-brand/:brandId",
  async (req: Request, res: Response, next: NextFunction) => {}
);

// Read All Brand Per Location
router.post(
  "/get-all/location/brand",
  async (req: Request, res: Response, next: NextFunction) => {}
);
export { router };
