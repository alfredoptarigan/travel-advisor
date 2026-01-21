import { Hono } from "hono"
import { getPlaces, postPlace } from "../controllers/placeController"
import { authGuard } from "../middleware/authGuard"

const router = new Hono()

router.get("/v1/places", getPlaces)
router.post("/v1/places", authGuard, postPlace)

export default router
