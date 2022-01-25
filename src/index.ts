import dotenv from "dotenv";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection, getConnection, getRepository } from "typeorm";
import { apiLimitter } from "./http/common/RateLimiter";

var xss = require("xss-clean");
dotenv.config();

import {
  tenantEmployeeRoutes,
  tenantCourseRoutes,
  tenantbrandRoutes,
  tenantAuthRoutes,
} from "./http";

const PORT = 5000;
const app = express();
app.use(cors());
app.use(apiLimitter);
app.use(xss());
// middleware
app.use(express.json({ limit: "30kb" })); // Body limit is 10
// app.use("/api/", apiLimitter);

createConnection()
  .then(async () => {
    // TENANT ROUTES
    app.use("/app", tenantAuthRoutes);
    app.use("/api/tenant/brand", tenantbrandRoutes);
    app.use("/api/tenant/employee", tenantEmployeeRoutes);
    app.use("/api/tenant/course", tenantCourseRoutes);

    app.listen(process.env.PORT || PORT, () =>
      console.log(`Server up at http://localhost:${PORT} Yeah!!!`)
    );
  })
  .catch((error) => console.log(error));
