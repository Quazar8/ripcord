import { Response } from "express"
import { errorResponse, ServerResponse, successResponse } from '../../responses.js'
import { ReqWUser } from "../../types/RequestTypes.js"
import { uploadProfilePic } from './uploadMethods.js'

export type ProfilePicResponse = ServerResponse<{}>

const profilePicHandler = async (req: ReqWUser, res: Response) => {
    const [file, error] = await uploadProfilePic(req)
    let response: ProfilePicResponse = null

    if (error) {
        response = errorResponse(error.errorMsg)
        res.status(error.status).send(response)
        return
    }

    req.user.profilePic = '/static/profilePics/' + file.newFilename

    try {
        await req.user.save()
        response = successResponse({})
        res.status(200).send(response)
    } 
    catch (err) {
        console.error('Saving user profile pic error')
        console.error(err)
        response = errorResponse('Something went wrong')
        res.status(500).send(response)
    }
}

export default profilePicHandler