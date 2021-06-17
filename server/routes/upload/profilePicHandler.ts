import { Response, Request } from "express"
import { successResponse } from '../../responses.js'
import { uploadProfilePic } from './uploadMethods.js'

const profilePicHandler = (req: Request, res: Response) => {
    uploadProfilePic(req, res)
}

export default profilePicHandler