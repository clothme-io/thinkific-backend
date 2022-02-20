import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

// Add A Brand: Can only be done by Employee with the right role and duties.
router.get(
  "/health-check",
  async (req: Request, res: Response, next: NextFunction) => {
    return "All Good";
  }
);

export { router };
