import express from 'express'
import { asyncHandler } from './asyncHandler.js'
import { ApiError } from './ApiError.js'

const app = express()


app.get('/', (req, res)=>{

    res.send("let's create async handler")
})

app.get( "/post/v1", asyncHandler((req, res)=>{
    res.send('thesse are the posts')
}))

app.listen(3000, ()=>{
    console.log('app is working fine')
})
