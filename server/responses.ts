type ErrorResponseType = {
    error: true
    errorMsg: string
}

type SuccessResponseType<T> = {
    error: false
    msg: string,
    data: T
}

const errorResponse = (errorMsg: string): ErrorResponseType => {
    return {
        error: true,
        errorMsg
    }
}

const successResponse = 
    <T>(data: T, msg: string): SuccessResponseType<T> => {
        
    return {
        error: false,
        msg,
        data
    }
}

export {
    errorResponse,
    successResponse,
    SuccessResponseType,
}