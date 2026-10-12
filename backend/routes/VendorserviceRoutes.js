import express from "express";
import {
  createvendorservice,
  deletevendorservice,
  getmyvendorservice,
  getvendorservice,
  getvendorservicebyid,
  getvendorservicebyslug,
  updatevendorservice,
} from "../controllers/Vendorservicecontroller.js";
import { islogin } from "../middleware/islogin.js";
const VendorserviceRouter = express.Router();
VendorserviceRouter.post("/", createvendorservice);
VendorserviceRouter.delete("/delete/:id", deletevendorservice);
VendorserviceRouter.put("/update/:id", updatevendorservice);
VendorserviceRouter.get("/getservice/id/:id", getvendorservicebyid);
VendorserviceRouter.get("/getservice/slug/:slug", getvendorservicebyslug);
VendorserviceRouter.get("/getall", getvendorservice);
VendorserviceRouter.get("/getmyvendor", islogin, getmyvendorservice);
export default VendorserviceRouter;
