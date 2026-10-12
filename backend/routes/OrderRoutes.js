import {
  createorder,
  deleteorder,
  getallorders,
  getorderbyid,
  updateorder,
} from "../controllers/Ordercontroller.js";
import express from "express";
const OrderRouter = express.Router();
OrderRouter.post("/", createorder);
OrderRouter.get("/get", getallorders);
OrderRouter.get("/getbyid/:id", getorderbyid);
OrderRouter.put("/update/:id", updateorder);
OrderRouter.delete("/delete/:id", deleteorder);
export default OrderRouter;
