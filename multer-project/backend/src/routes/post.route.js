import { Router } from "express"
import { createProduct, deleteProduct } from "../controllers/post.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route('/create').post(upload.single("image") , createProduct)

router.route('/delete/:id').delete(deleteProduct)

export default router