import dotenv from "dotenv";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { apiLimitter } from "./http/common/RateLimiter";

var xss = require("xss-clean");
dotenv.config();

import {
  tenantEmployeeRoutes,
  tenantCourseRoutes,
  tenantbadgeRoutes,
  tenantAuthRoutes,
  healthCheck,
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
    // Health Check
    app.use("/app/v1", healthCheck);
    // TENANT ROUTES
    app.use("/app/v1", tenantAuthRoutes);
    app.use("/api/v1/tenant/badge", tenantbadgeRoutes);
    app.use("/api/v1/tenant/employee", tenantEmployeeRoutes);
    app.use("/api/v1/tenant/course", tenantCourseRoutes);

    app.listen(process.env.PORT || PORT, () =>
      console.log(`Server up at http://localhost:${PORT} Yeah!!!`)
    );
  })
  .catch((error) => console.log(error));
