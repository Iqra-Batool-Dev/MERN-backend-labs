import { Router } from "express";
import { generateOrder, getOrderStats } from "../controllers/orders.controller.js";

const router = Router()

router.route("/placeOrder").post(generateOrder)
router.route('/getOrderStats').get(getOrderStats)
// router.route('/deleteDocs').delete(deleteDocs)
export default router