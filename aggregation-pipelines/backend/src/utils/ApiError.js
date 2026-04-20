class ApiError extends Error{
    constructor (
        statusCode,
        message = "something went wrong",
        success = false ,
        errors ,
        stack = ''

    ){
        super(message),
        this.statusCode = statusCode
        this.message = this.message
        this.success = success
        this.errors = errors
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.constructor)
        }
        
    }
}

export{ApiError}