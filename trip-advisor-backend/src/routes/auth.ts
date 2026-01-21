import { Hono } from "hono";
import {
  loginEmailPassword,
  logout,
  registerEmailPassword,
} from "../controllers/auth.controller";
const router = new Hono();

router.post("/v1/auth/register", registerEmailPassword);
router.post("/v1/auth/login", loginEmailPassword);
router.post("/v1/auth/logout", logout);

export default router;
