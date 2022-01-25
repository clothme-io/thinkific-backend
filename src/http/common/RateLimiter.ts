import rateLimit from "express-rate-limit";

export const apiLimitter = rateLimit({
  max: 100, // max requests
  windowMs: 15 * 60 * 1000, // 1 Hour
  message: "Too many requests", // message to send
  statusCode: 429,
});
