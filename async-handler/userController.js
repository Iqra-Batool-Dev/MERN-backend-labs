import { ApiError } from "./ApiError"
import { ApiResponse } from "./ApiResponse"
import { asyncHandler } from "./asyncHandler"


/* using global asyncHandler to avoid repetitive usage of tryCatch 
block inside every controller */
const registerUser = asyncHandler(async(req, res)=>{
        const {username , email, password}= req.body
        const userExist = await User.findOne({email})
        if(userExist){
        
            // using ApiError class to send the customize error
            throw new ApiError(400, "Something went wrong") 
        }
    })
    
    
    





    const loginUser = asyncHandler( async (req,res) => {
    
            const {email, password} = req.body
    
            if(!email) {
                throw new ApiError(400, 'Email is required')
            }
    
            const user = await User.findOne({email})
    
            if(!user) {
                throw new ApiError(404, 'User does not exist')
            }
    
            const isPasswordValid  = await user.isPasswordCorrect(password)
            if(!isPasswordValid) {
                throw new ApiError(401, 'Incorrect password')
                    }
            const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)            
            const loggedInUser = await User.findById(user._id).select('-password -refreshToken')                                        
            const options = {
                httpOnly: true,
                secure: true
            }
            return res
                    .status(200)
                    .cookie('accessToken', accessToken, options)
                    .cookie('refreshToken', refreshToken, options)
                    .json(
                        new ApiResponse(200,{user: loggedInUser, refreshToken, accessToken}, 'User loggedIn successfully')
                    )
    })