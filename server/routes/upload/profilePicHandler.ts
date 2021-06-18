import fs from 'fs'
import path from 'path'
import { Response } from "express"
import { errorResponse, ServerResponse, successResponse } from '../../responses.js'
import { ReqWUser } from "../../types/RequestTypes.js"
import { uploadProfilePic, dirLocation } from './uploadMethods.js'

export type ProfilePicResponse = ServerResponse<{}>

const profilePicHandler = async (req: ReqWUser, res: Response) => {
    const [file, error] = await uploadProfilePic(req)
    let response: ProfilePicResponse = null

    if (error) {
        response = errorResponse(error.errorMsg)
        res.status(error.status).send(response)
        return
    }


    try {
        if (req.user.profilePic) {
            const oldLocation = path.join(dirLocation, req.user.profilePic)
            fs.unlink(oldLocation, (err) => {
                if (err) console.error(error)
            })
        }

        req.user.profilePic = file.newFilename
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