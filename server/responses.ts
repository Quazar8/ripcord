export type ErrorResponseType = {
    error: true
    errorMsg: string
}

export type SuccessResponseType<T> = {
    error: false
    msg: string,
    data: T
}

export type ServerResponse<T> = ErrorResponseType | SuccessResponseType<T>

export const errorResponse = (errorMsg: string): ErrorResponseType => {
    return {
        error: true,
        errorMsg
    }
}

export const successResponse = 
    <T>(data: T, msg: string): SuccessResponseType<T> => {
        
    return {
        error: false,
        msg,
        data
    }
}