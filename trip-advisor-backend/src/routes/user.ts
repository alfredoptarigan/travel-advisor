import { Hono } from "hono";
import { authGuard } from "../middleware/authGuard";
import { getMe, updateProfile } from "../controllers/user.controller";

const router = new Hono();

router.get("/v1/users/me", authGuard, getMe);
router.put("/v1/users/me", authGuard, updateProfile);

export default router;
