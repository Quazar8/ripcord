import path from 'path'
import fs from 'fs'
import Busboy from 'busboy'
import { ReqWUser } from '../../types/RequestTypes'
import { genId } from '../../utils.js'

type UploadResult = [{
    filename: string,
    newFilename: string,
    location: string
}, {
    errorMsg: string,
    status: number
}]

type ResolveFn = (result: UploadResult) => void

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

const handleProfilePic = (req: ReqWUser, done: ResolveFn) => {
    const bus = new Busboy({ headers: req.headers })

    bus.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        const dirLocation = path.resolve('./server/static/profilePics')
        if (!fs.existsSync(dirLocation)) {
            const err = await createDir(dirLocation)
            if (err) {
                console.error(err)
                done([null, {
                    errorMsg: 'Something went wrong with uploading your profile picture',
                    status: 500
                }])
                return
            }
        }

        if (!checkIfImage(mimetype, filename)) {
            done([null, {
                errorMsg: 'Not allowed file type',
                status: 400
            }])
            return
        }

        const newFilename = createNewFileName(req.user._id.toHexString(), filename)
        const location = path.join(dirLocation, newFilename)
        file.pipe(fs.createWriteStream(location)).on('finish', () => {
            console.log('writing file finished')
            done([{
                filename,
                newFilename,
                location
            }, null])
        })

        console.log('file metadata', {
            fieldname,
            filename,
            encoding,
            mimetype,
            newFilename
        })
    })

    req.pipe(bus)
}

export const uploadProfilePic = (req: ReqWUser): Promise<UploadResult> => {
    return new Promise((done) => {
        handleProfilePic(req, done)
    })
}