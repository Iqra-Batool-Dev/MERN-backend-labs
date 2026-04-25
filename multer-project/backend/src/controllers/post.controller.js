import asyncWrapper from "../utils/AsyncHnadler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import productModel from "../models/product.model.js"
import {uploadToCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js"

export const createProduct = asyncWrapper(async(req, res) =>{
    const {productName, price}= req.body

    // file inject by multer middleware
    if(!req.file){
        throw new ApiError(400,  "product image is required") 
    }

    //using cloudinary utility to upload file
    const cloudinaryResult = await uploadToCloudinary(req.file.path)

    const product= await productModel.create({
        productName ,
        price,
        media : cloudinaryResult.secure_url,
        cloudinaryPublicId: cloudinaryResult.public_id
    })

    if(!product){
        throw new ApiError(500, "something went wrong while creating the product")
    }

    return res
    .status(201)
    .json(new ApiResponse(201, product , "product is created successfully"))
})


// deleting product from mongoDB as well as the image from cloudinary
export const deleteProduct = asyncWrapper(async(req, res)=>{

    const product  = await productModel.findById(req.params.id)

    console.log("product is not arrived", product)

    // cloudinary util to delete product image from cloudinary
    const response = await deleteFromCloudinary(product.cloudinaryPublicId)

    //delete product from database
    await productModel.findByIdAndDelete(req.params.id)

    return res
    .status(200)
    .json(new ApiResponse(200, Response, "product has been deleted successfully"))
})

