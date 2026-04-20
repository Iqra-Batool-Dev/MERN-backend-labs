import express from "express"
import path from "path"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(import.meta.dirname , "public")))


//import routes
import userRouter from './src/routes/user.routes.js'
import orderRouter from './src/routes/order.routes.js'
import { ApiError } from "./src/utils/ApiError.js"
import { connectDb } from "./src/db/dbConfig.js"



app.get('/' , (req, res)=>{
    res.send('app is available')
})

//configured base routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/orders', orderRouter)


//if no route match then it will run definitely
app.use(async(req, res, next)=>{
    next(400, new ApiError(` Route ${req.method} ${req.path} not found`))
})


connectDb()
//listen server
app.listen(3000, ()=>{
    console.log("app is running properly")
})