import express from "express";
import { createContactMessage } from "../controllers/Concatcontroller.js";

const ContactRouter = express.Router();

ContactRouter.post("/", createContactMessage);

export default ContactRouter;
