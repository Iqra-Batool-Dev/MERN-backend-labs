import mongoose, {Schema} from 'mongoose'

const orderSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    orderNumber : {
        type: String,
        unique : true,
        required : true
    },
    status : {
        type: String,
        default : "PENDING"
    },
    product : [
        {productName : String , productQyt : Number , price : Number}
    ]
},{
    timestamps: true
})

export default mongoose.model('Order', orderSchema)

