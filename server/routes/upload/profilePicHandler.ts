import { Response } from "express"
import { errorResponse, successResponse } from '../../responses.js'
import { ReqWUser } from "../../types/RequestTypes.js"
import { uploadProfilePic } from './uploadMethods.js'

const profilePicHandler = async (req: ReqWUser, res: Response) => {
    const [file, errorMsg] = await uploadProfilePic(req)

    if (errorMsg) {
        res.send(errorResponse(errorMsg))
        return
    }

    res.send(successResponse({
        filename: file.filename
    }))
}

export default profilePicHandler