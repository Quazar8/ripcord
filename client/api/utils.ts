import { ServerResponse, ErrorResponseType } from "../../server/responses";

export const resHasError = <T>(res: ServerResponse<T>): res is ErrorResponseType => {
    return res.error
}