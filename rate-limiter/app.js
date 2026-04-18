import express from 'express';

const app = express()

// define a Map object to preserve the request counts and timestamps 
const requestCounts = new Map()

const customRateLimiter = (req, res, next)=>{

    // define time limit and max request number
    const WINDOW_TIME_LIMIT =  60 * 1000 ; //1 minute in milliseconds
    const MAX_REQUEST = 5;

    const clientIP = req.ip

    // check if the client's Ip is present in requestCounts object
    if(!requestCounts.has(clientIP)){
        requestCounts.set(clientIP , {
            count : 1,
            startTime : Date.now()
        })
        return next()
    }

    // get the client data from requestCounts object and define current time
    const clientData = requestCounts.get(clientIP)
    const currentTime = Date.now()

    // check if the time limit has passed if yes than reset the client request count and current time
    const timePassed = currentTime-clientData.startTime
    if(timePassed > WINDOW_TIME_LIMIT){
        requestCounts.set(clientIP , {
            count: 1,
            startTime : currentTime
        })
        return next()
    }

    // if time limit is not passed than compare the request counts with request limit and add update the count by 1, if request limit exceed than send an error msg
    if(clientData.count < MAX_REQUEST){
        clientData.count++ 
        requestCounts.set(clientIP , clientData)
        return next ()
    } else{
        const remainingTime = WINDOW_TIME_LIMIT - timePassed
        const remainingSeconds = Math.ceil(remainingTime / 1000)
        const remainingMinutes = Math.ceil(remainingSeconds/60)
        res.status(429).send(`you have sent too many requests , please try again after : ${remainingMinutes} minute`)
    }
    
}

app.use(customRateLimiter)

app.get('/', (req, res)=>{
    res.status(200).send('welcome to the rate limiter API')
})

app.listen(3000, ()=>{
    console.log('app is running on port:3000')
})