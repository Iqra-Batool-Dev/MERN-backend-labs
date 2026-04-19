const asyncHandler = (requestHandler)=>{
    return async(req, res, next)=>{
        try {
            await requestHandler(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}
export {asyncHandler}


// how to handle rout not match error.

// your real routes go first
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// this runs ONLY if nothing above matched
app.use((req, res, next) => {
  next(new AppError(`Route ${req.method} ${req.path} not found`, 404));
});

// your global error handler is always last
app.use((err, req, res, next) => {
  // your existing error handler code
});


// That's the entire bonus challenge. Three lines.



// **The mental model that makes this click forever:**

// Think of Express as a waterfall. Every request starts at the top and falls through each middleware/route one by one. The moment a route calls `res.json()` or `res.send()` — the waterfall stops, response is sent. If the water reaches the bottom without hitting anything — that's your 404 middleware catching it.

// Request comes in

app.use('/api/users')   // ← matches? stop here
    //    ↓ no match
app.use('/api/products')  // ← matches? stop here
    //    ↓ no match
app.use(404, handler)     // ← always catches what fell through
    //    ↓
app.use(error, handler)  // ← always last, catches all next(err) calls