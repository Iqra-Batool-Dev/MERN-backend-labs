import multer from "multer"
import ApiError from "../utils/ApiError.js"

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./public/temp") // temporary local folder location
    },
    filename : (req, file, cb)=>{
        const uniqueSuffix = Date.now() +  '-' + Math.round(Math.random()*1e9)
        cb(null, `${file.originalname} - ${uniqueSuffix}` )
    }
})


const fileFilter = (req, file, cb) =>{
    const allowedFormate = ['image/png', 'image/jpeg', 'image/webp']
    if(allowedFormate.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new ApiError(400, "only png and jpeg formate is allowed"), false)
    }
}


export const upload = multer({
    storage: storage,
    fileFilter ,
    limits:{
        fileSize : 1024 * 1024 *5, 
        files : 3
    }
})