import { body } from "express-validator"; // , validationResult
// import { NextFunction, Request, Response } from "express";

export const iDValidationRules = [
  body("tenantId")
    .isLength({ min: 1 })
    .withMessage("tenantId cannot be empty"),
  body("role")
    .isIn([
      "STAFF",
      "TENANT_ADMIN_EXECUTIVE",
      "TENANT_ADMIN",
      "LOCATION_ADMIN_EXECUTIVE",
      "LOCATION_ADMIN",
      "LOCATION_EMPLOYEE",
    ])
    .withMessage(`Role not in accepted list`),
  body("duties")
    .isIn([
      "STAFF",
      "PRODUCT",
      "ORDER",
      "EMPLOYEE",
      "CUSTOMER",
      "REPORTS",
      "ANALYTICS",
    ])
    .withMessage(`Duties not in accepted list`),
  body("locationId")
    .isLength({ min: 1 })
    .withMessage("Location Id must be present"),
  body("password")
    .isLength({ min: 1 })
    .withMessage("Password must not be empty")
];

// const simpleVadationResult = validationResult.withDefaults({
//   formatter: (err) => err.msg,
// });

// export const checkForErrors = (req: Request, res: Response, next: NextFunction) => {
//   const errors = simpleVadationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json(errors.mapped());
//   }
//   next();
// };
