import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import {
  checkIfEmployeeTenantExist,
  checkIfEmployeeTenantExist2,
} from "../utils/checkDB";
import { v4 as uuid } from "uuid";
import { nanoid } from "nanoid";
import uniqid from "uniqid";
import { hasDuplicates } from "../utils/utils";
import { sendEmailWithSendGrid } from "../../common/SendEmail";

const router = express.Router();

// Create
router.post(
  "/add-employee",
  async (req: Request, res: Response, next: NextFunction) => {
    // const { executiveStaff, newEmployee } = req.body;
    // if (!executiveStaff || !newEmployee) {
    //   return res.status(400).send({ message: "Missing Fields" });
    // }
    // try {
    //   const employeeRepo = getRepository(Employee);
    //   const locationRepo = getRepository(Location);
    //   // Check if Details Aleady Exist
    //   const detailsExists: any = await checkIfEmployeeTenantExist2(
    //     executiveStaff
    //   );
    //   if (detailsExists.res === false) {
    //     return res.status(400).send({ message: "Detail does not exist" });
    //   }
    //   // vhevk for employye permission
    //   const isPermitted = hasPermissionToRead2(
    //     detailsExists,
    //     ["tenant executive", "tenant super admin"],
    //     "write",
    //     "employee"
    //   );
    //   if (!isPermitted) {
    //     return res.status(400).send({ message: "Permission Required" });
    //   }
    //   const loc = await locationRepo.find({
    //     where: {
    //       // tenant: detailsExists.tenant,
    //       shortId: newEmployee.locationName,
    //     },
    //   });
    //   if (!loc) {
    //     return res.status(400).send({ message: "Location does not exist" });
    //   }
    //   console.log("loc:", loc)
    //   // Create Tenant in Firebase
    //   const passwordData = uniqid();
    //   const { uid } = await admin.auth().createUser({
    //     displayName: newEmployee.firstName + " " + newEmployee.lastName,
    //     email: newEmployee.email,
    //     password: passwordData,
    //   });
    //   // Add Employee
    //   const uuidEmployee = uuid();
    //   const employeeRes = employeeRepo.create({
    //     uuid: uuidEmployee,
    //     shortId: uid,
    //     firstName: newEmployee.firstName,
    //     lastName: newEmployee.lastName,
    //     email: newEmployee.email,
    //     tenantName: detailsExists.tenant?.name,
    //     phoneNumber: newEmployee.phoneNumber,
    //     position: newEmployee.position,
    //     isTenantContact: newEmployee.isTenantContact,
    //     tenant: detailsExists.tenant,
    //   });
    //   await employeeRes.save();
    //   //Assign Employee to Location
    //   let employeeToLoc: any = [];
    //   if (loc.length > 0) {
    //     let index = 0;
    //     let uuidEmployeeToLoc = uuid();
    //     let nanoIdEmployeeToLoc = nanoid();
    //     while (loc.length > index) {
    //       const employeeToLocRes = EmployeeToLocation.create({
    //         uuid: uuidEmployeeToLoc,
    //         shortId: nanoIdEmployeeToLoc,
    //         name: loc[index].name,
    //         employee: employeeRes,
    //         location: loc[index],
    //         tenant: detailsExists.tenant,
    //         roles: newEmployee.roles,
    //         duties: newEmployee.duties,
    //         isLocationContact: newEmployee.isLocationContact,
    //       });
    //       await employeeToLocRes.save();
    //       employeeToLoc.push(employeeToLocRes);
    //       index++;
    //       uuidEmployeeToLoc = uuid();
    //       nanoIdEmployeeToLoc = nanoid();
    //     }
    //   }
    //   // Set new Employee CustomClaims in Firebase
    //   await admin.auth().setCustomUserClaims(uid, {
    //     tenantName: detailsExists.tenant.name,
    //     tenantUuid: detailsExists.tenant.uuid,
    //     tenantId: detailsExists.tenant.id,
    //     tenantShortId: detailsExists.tenant.shortId,
    //     employeeId: employeeRes.id,
    //     employeeUuid: employeeRes.uuid,
    //     employeeShortId: employeeRes.shortId,
    //   });
    //   // Send New Employee Email with details
    //   await sendEmailWithSendGrid(
    //     newEmployee.email,
    //     "clothme2019@outlook.com",
    //     "Your SignIn Details From ClothME",
    //     `The Authroised administrator for your company's account created an account
    //     for you with the following details: Please contact for your email as, we do not share the email
    //     as a security precaution but here is your password details: ${passwordData}
    //     You will be required to change then after your first login`
    //   );
    //   // Return Succes
    //   return res.status(200).send({
    //     data: { message: "Employee Successfully Added" },
    //   });
    // } catch (error) {
    //   return res.status(500).send({
    //     messageRegister: `${error.code} - ${error.message}`,
    //     errorMesage: error,
    //   });
    // }
  }
);

// Update
router.patch(
  "/tenant/:staffId",
  async (req: Request, res: Response, next: NextFunction) => {}
);

// Delete
router.delete(
  "/tenant-user/:staffId",
  async (req: Request, res: Response, next: NextFunction) => {}
);

export { router };
