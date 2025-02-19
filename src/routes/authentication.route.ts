import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticactionController";

const router = Router();

router.post("/signin", AuthenticationController.signin);

export default router;