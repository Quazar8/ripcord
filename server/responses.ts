type ErrorResponseType = {
    error: true
    errorMsg: string
}

type SuccessResponseType<Object> = {
    error: false
    msg: string,
    data: Object
}

const errorResponse = (errorMsg: string): ErrorResponseType => {
    return {
        error: true,
        errorMsg
    }
}

const successResponse = 
    (data: any = null, msg: string): SuccessResponseType<any> => {
        
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