import { Request, Response, Router } from "express";
import PropertyController from "../controllers/PropertyController";
import { isLoggedIn } from "../middleware.ts/isLoggedIn";
import { isHost } from "../middleware.ts/isHost";


const router = Router();

router.post('/',isLoggedIn, PropertyController.createProperty);
router.get('/', PropertyController.listProperties);

router.post("/", isLoggedIn, isHost, PropertyController.createProperty);
router.get("/me", isLoggedIn, PropertyController.getMyProperties);
router.get("/me/:id", isLoggedIn, isHost, PropertyController.getMyOneProperty);
router.put("/me/:id", isLoggedIn, isHost, PropertyController.updateProperty);
router.delete("/me/:id", isLoggedIn, isHost, PropertyController.deleteProperty);

export default router;
