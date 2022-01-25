import { body } from "express-validator";

export const brandValidationRules = [
  body("brandName")
    .isLength({ min: 1 })
    .withMessage("Brand Name cannot be empty"),
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
];

