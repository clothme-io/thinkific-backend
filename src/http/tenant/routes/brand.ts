import express, { NextFunction, Request, Response } from "express";
import { getRepository, getTreeRepository } from "typeorm";
import { Course } from "../../../entity/Course";
import {
  checkIfEmployeeTenantExist,
  checkIfEmployeeTenantExist2,
} from "../utils/checkDB";
import { nanoid } from "nanoid";
import { v4 as uuid } from "uuid";
import { hasDuplicates } from "../utils/utils";
// import { iDValidationRules, brandValidationRules } from "../utils";

const router = express.Router();

// Add A Brand: Can only be done by Employee with the right role and duties.
router.post(
  "/add",
  // iDValidationRules,
  // brandValidationRules,
  async (req: Request, res: Response, next: NextFunction) => {}
);

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
