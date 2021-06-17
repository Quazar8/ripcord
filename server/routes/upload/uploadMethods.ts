import { Request, Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import Busboy from 'busboy'
import { successResponse } from "../../responses.js";

export const uploadProfilePic = (req: Request, res: Response) => {
    const bus = new Busboy({ headers: req.headers })
    bus.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log('file metadata', {
            fieldname,
            filename,
            encoding,
            mimetype
        })

        file.on('data', data => {
            console.log(fieldname + ' got ' + data.length)
        })

    })

    bus.on('finish', () => {
        console.log('finished')
        res.send(successResponse({}))
    })

    req.pipe(bus)
}