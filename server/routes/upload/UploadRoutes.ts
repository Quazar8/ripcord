import { Application } from "express";
import profilePicHandler from "./profilePicHandler.js";
import UploadUrls from "./UploadUrls.js";
import { authenticateUser } from '../../middlewares.js'

const enableUploadRoutes = (app: Application) => {
    app.post(UploadUrls.profilePic, authenticateUser, profilePicHandler)
}

export default enableUploadRoutes