type ResponseData = Object | Array<Object> | null

type ErrorResponse = {
    error: true
    errorMsg: string
}

type SuccessResponse = {
    error: false
    msg: string
    data: ResponseData
}

const errorResponse = (errorMsg: string): ErrorResponse => {
    return {
        error: true,
        errorMsg
    }
}

const successResponse = 
    (data: ResponseData = null, msg: string): SuccessResponse => {
        return {
            error: false,
            msg,
            data
        }
}

export {
    errorResponse,
    successResponse
}