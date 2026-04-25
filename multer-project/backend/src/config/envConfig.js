
import { config } from "dotenv"

config({path : " ../../.env"})

const envVars = {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey : process.env.CLOUDINARY_API_KEY,
    apiSecret : process.env.CLOUDINARY_API_SECRET

}

const getEnv = (varName)=>{
    if(typeof envVars[varName] === "undefined"){
        console.error(`${varName} is not available`)
        process.exit(1)
    } else{
        return envVars[varName]
    }
}

export default getEnv