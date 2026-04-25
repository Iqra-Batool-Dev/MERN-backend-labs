class ApiResponse {
    constructor(
        statusCode,
        data,
        message = " request successful",
        success=  true,

    ){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = success
    }
}

export default ApiResponse