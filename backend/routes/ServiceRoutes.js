import express from "express";
import {
  createservice,
  deleteservice,
  getservicebyid,
  getservicebyslug,
  getservices,
  updateservice,
} from "../controllers/Servicecontroller.js";

const ServiceRouter = express.Router();
ServiceRouter.post("/create", createservice);
ServiceRouter.get("/getallservices", getservices);
ServiceRouter.get("/getbyid/:id", getservicebyid);
ServiceRouter.get("/getbyslug/:slug", getservicebyslug);
ServiceRouter.put("/update/:id", updateservice);
ServiceRouter.delete("/delete/:serviceid", deleteservice);
export default ServiceRouter;
