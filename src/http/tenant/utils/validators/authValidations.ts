import { body } from "express-validator";

export const tenantAuthValidationRules: any[] = [
  body("email")
    .isLength({ min: 1 })
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Must be a valid email address"),
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
  body("displayName")
    .isLength({ min: 1 })
    .withMessage("Name must not be empty"),
  body("password")
    .isLength({ min: 1 })
    .withMessage("Password must not be empty")
    .isLength({ min: 6 })
    .withMessage("Password minimum length must be 6")
    .isLength({ max: 20 })
    .withMessage("Password maximum length must not be more than 20"),
  // body("phoneNumber")
  //   .isLength({ min: 1 })
  //   .withMessage("Phone Number must not be empty")
  //   .isMobilePhone()
  //   .withMessage("Must be a valid Phone Number"),
];
