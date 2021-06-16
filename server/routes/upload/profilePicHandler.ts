import { Response, Request } from "express"
import { successResponse } from '../../responses.js'

const profilePicHandler = (req: Request, res: Response) => {
    res.send(successResponse({}))
}

export default profilePicHandler