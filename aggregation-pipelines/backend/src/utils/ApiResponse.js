class ApiResponse {
    constructor(
        statusCode ,
        message ,
        data
    ){
        this.statusCode = statusCode
        this.message = message || 'successful'
        this.data = data
    }
}

export {ApiResponse}