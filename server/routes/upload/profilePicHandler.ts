import { Response, Request } from "express"
import { successResponse } from '../../responses.js'
import { ReqWUser } from "../../types/RequestTypes.js"
import { uploadProfilePic } from './uploadMethods.js'

const profilePicHandler = (req: ReqWUser, res: Response) => {
    uploadProfilePic(req, res)
}

export default profilePicHandler