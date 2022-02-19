// https://platform.thinkific.com/api/v2/webhooks?page=1&limit=25

import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
var crypto = require("crypto");

const router = express.Router();

// Add A Brand: Can only be done by Employee with the right role and duties.
router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send({});
  } catch (error) {
    return res.send({ error: error });
  }
});

// Update: To Attach Locations To Brand
router.post(
  "/recieved/web/hook",
  async (req: Request, res: Response, next: NextFunction) => {}
);

// Read All Brand Per Location
router.post(
  "/get-all/location/brand",
  async (req: Request, res: Response, next: NextFunction) => {}
);
export { router };
