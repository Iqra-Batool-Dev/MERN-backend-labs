import {v2 as cloudinary} from "cloudinary"
import getEnv from "../config/envConfig.js"
import fs from "fs"
import path from "path"
import ApiError from "./ApiError.js"

const CLOUD_NAME = getEnv("cloudName")
const API_KEY = getEnv("apiKey")
const API_SECRET = getEnv("apiSecret")

cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET
})

export const uploadToCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null

        //upload on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto",
            folder : "MERN-Challenge"
        })
        console.log(`the file is uploaded successfully : ${response.url}`)

        // if file uploaded successfully remove it from local storage
        fs.unlinkSync(localFilePath)

        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)
        throw new ApiError(500, "something went wrong while uploading image to cloudinary")
    }
}


// deleting the image from cloudinary
export const deleteFromCloudinary = async(publicId)=>{
    try {
        
        if(!publicId){
            throw new ApiError(400, "image id is required")
        }
    
        const response = await cloudinary.uploader.destroy(publicId)
    
        console.log("file has been deleted from cloudinary", response)
    
        return response
    } catch (error) {
        throw new ApiError(500, "failed to delete the image from cloudinary")
    }
}