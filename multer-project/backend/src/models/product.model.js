import mongoose, {Schema} from "mongoose"
import { type } from "os"

const productSchema = new Schema({
    productName :{
        type: String,
        required : true
    },
    price : {
        type : Number
    },
    media: {
        type: String
    },
    cloudinaryPublicId : {
        type: String
    }
},{
    timestamps : true
})

export default mongoose.model("Product" , productSchema )