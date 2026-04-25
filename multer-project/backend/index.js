import express, { urlencoded } from "express"
import path from "path"
import { connectDb } from "./src/db/dbConfig.js"

const app = express()

app.use(express.static(path.join(import.meta.dirname , "public")))
app.use(urlencoded({extended:true}))
app.use(express.json())

// import routes 
import postRoute from "./src/routes/post.route.js"


app.get("/", (req, res)=>{
    res.send("app is running properly")
})

// configure base route
app.use("/api/v1/post", postRoute)


//connect database
connectDb()
.then(
    app.listen(3000, ()=>{
        console.log("app is running properly")
    })
)