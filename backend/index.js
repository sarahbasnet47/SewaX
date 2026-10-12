import express from "express";
import "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import ServiceRouter from "./routes/ServiceRoutes.js";
import AuthRouter from "./routes/AuthRoutes.js";
import PostRouter from "./routes/PostRoutes.js";
import vendorRouter from "./routes/vendorRoutes.js";
import VendorserviceRouter from "./routes/VendorserviceRoutes.js";
import OrderRouter from "./routes/OrderRoutes.js";
import ContactRouter from "./routes/ContactRoutes.js";
const app = express();
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello this is my first practice ",
  });
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/service", ServiceRouter);
app.use("/api/v1/post", PostRouter);
app.use("/api/v1/vendor", vendorRouter);
app.use("/api/v1/vendor/service", VendorserviceRouter);
app.use("/api/v1/order",OrderRouter);
app.use("/api/v1/contact", ContactRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
