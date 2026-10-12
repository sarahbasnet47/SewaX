import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./Privateroute";
import { PublicRoutes } from "./publicroute";

const router = createBrowserRouter([PublicRoutes, PrivateRoutes]);
export default router;
