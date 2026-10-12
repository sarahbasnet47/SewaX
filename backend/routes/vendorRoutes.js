import express from "express";
import {
  createVendor,
  deletevendor,
  getvendor,
  getvendorbyid,
  getvendorbyslug,
  updatevendor,
} from "../controllers/Vendorcontroller.js";
const vendorRouter = express.Router();
vendorRouter.post("/", createVendor);
vendorRouter.get("/get", getvendor);
vendorRouter.put("/update/:id", updatevendor);
vendorRouter.delete("/delete/:id", deletevendor);
vendorRouter.get("/get/:id", getvendorbyid);
vendorRouter.get("/getbyslug/:slug", getvendorbyslug);

export default vendorRouter;
