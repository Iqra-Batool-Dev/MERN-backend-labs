import mongoose from 'mongoose'

export const connectDb = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test_app3')
        console.log("mongodb connected")
    } catch ( error) {
        console.log("mongodb connection failed" ,error)
    }
}