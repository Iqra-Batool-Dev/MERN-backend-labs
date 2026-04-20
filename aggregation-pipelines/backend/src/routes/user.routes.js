import { Router } from "express"
import { createUser, getUser } from "../controllers/user.controller.js"

const router = Router()

router.route("/create").post(createUser)
router.route("/fetchUser").get(getUser)

export default router
