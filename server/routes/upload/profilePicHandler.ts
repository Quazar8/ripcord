import { Response } from "express"
import { errorResponse, successResponse } from '../../responses.js'
import { ReqWUser } from "../../types/RequestTypes.js"
import { uploadProfilePic } from './uploadMethods.js'

const profilePicHandler = async (req: ReqWUser, res: Response) => {
    const [file, error] = await uploadProfilePic(req)

    if (error) {
        res.status(error.status).send(errorResponse(error.errorMsg))
        return
    }

    res.send(successResponse({
        filename: file.filename
    }))
}

export default profilePicHandler