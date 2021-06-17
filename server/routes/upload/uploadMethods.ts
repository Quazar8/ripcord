import path from 'path'
import fs from 'fs'
import { Request, Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import Busboy from 'busboy'
import { errorResponse, successResponse } from "../../responses.js";

const createDir = (dirLocation: fs.PathLike) => {
    return new Promise((done, reject) => {
        fs.mkdir(dirLocation, (err) => {
            if (err) return reject(err)
            
            console.log('created a profile pic folder')
            done(null)
        })
    })
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

export const uploadProfilePic = (req: Request, res: Response) => {
    const bus = new Busboy({ headers: req.headers })
    bus.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        console.log('file metadata', {
            fieldname,
            filename,
            encoding,
            mimetype
        })

        const dirLocation = path.resolve('./server/static/profilePics')
        if (!fs.existsSync(dirLocation)) {
            await createDir(dirLocation).catch(err => {
                console.log(err)
                res.status(500).send(errorResponse('Something went wrong with '
                    + 'uploading your profile picture'))
            })
        }

        if (!checkIfImage(mimetype, filename)) {
            res.status(500).send(errorResponse('Not allowed image type'))
            return
        }

        const location = path.join(dirLocation, filename)
        file.pipe(fs.createWriteStream(location))
    })

    bus.on('finish', () => {
        console.log('finished')
        res.send(successResponse({}))
    })

    req.pipe(bus)
}