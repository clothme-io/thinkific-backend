// https://platform.thinkific.com/api/v2/webhooks?page=1&limit=25

import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
var crypto = require("crypto");

const router = express.Router();

// Add A Brand: Can only be done by Employee with the right role and duties.
router.post(
  "/webhooks",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.send({});
    } catch (error) {
      return res.send({ error: error });
    }
  }
);

export { router };
