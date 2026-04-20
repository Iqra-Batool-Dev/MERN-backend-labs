import asyncWrapper from "../utils/asyncHandler.js";
import userModel from "../models/user.model.js";
import { ApiResponse } from "../../../../async-handler/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createUser = asyncWrapper(async(req, res)=>{
    const {username , email, password} = req.body

    const user = await userModel.create({
        username: username,
        email: email,
        password : password
    })

    const userData = user
    if(!userData) {
        throw new ApiError(500 , "something went wrong while creating user")
    }

    return res
    .status(200)
    .json(new ApiResponse(200 , userData , "user created successfully"))

})

export const getUser = asyncWrapper(async(req, res)=>{
    
})
