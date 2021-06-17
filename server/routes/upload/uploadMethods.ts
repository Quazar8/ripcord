import path from 'path'
import fs from 'fs'
import Busboy from 'busboy'
import { Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import { errorResponse, successResponse } from "../../responses.js";
import { genId } from '../../utils.js'

const createDir = (dirLocation: fs.PathLike): Promise<Error> => {
    return new Promise((done, reject) => {
        fs.mkdir(dirLocation, (err) => {
            if (err) return reject(err)
            
            console.log('created a profile pic folder')
            done(null)
        })
    })
}

const createNewFileName = (userId: string, filename: string) => {
    return userId + '_' + genId(8) + path.extname(filename)
}

const checkIfImage = (mimetype: string, fileName: string) => {
    const ext = path.extname(fileName)
    if (!ext) return false

    const extRegex = /\.(jpg|jpeg|jfif|png)/
    if (!extRegex.test(ext)) return false

    const mimeRegex = /^image\/(jpeg|png)$/
    if (!mimeRegex.test(mimetype)) return false

    return true
}

const handleProfilePic = (req: ReqWUser, res: Response, done: Function , reject: Function) => {
    const bus = new Busboy({ headers: req.headers })
    bus.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        const dirLocation = path.resolve('./server/static/profilePics')
        if (!fs.existsSync(dirLocation)) {
            const err = await createDir(dirLocation)
            if (err) {
                console.error(err)
                res.status(500).send(errorResponse('Something went wrong with '
                    + 'uploading your profile picture'))
                return
            }
        }

        if (!checkIfImage(mimetype, filename)) {
            res.status(500).send(errorResponse('Not allowed image type'))
            return
        }

        const newFileName = createNewFileName(req.user._id.toHexString(), filename)
        const location = path.join(dirLocation, newFileName)
        file.pipe(fs.createWriteStream(location))

        console.log('file metadata', {
            fieldname,
            filename,
            encoding,
            mimetype,
            newFileName
        })
    })

    bus.on('finish', () => {
        console.log('bus finished')
        // res.send(successResponse({}))
    })

    req.pipe(bus)
}

export const uploadProfilePic = (req: ReqWUser, res: Response) => {
    return new Promise((done, reject) => {
        handleProfilePic(req, res, done, reject)
    })
}