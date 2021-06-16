import { Application } from "express";
import profilePicHandler from "./profilePicHandler.js";
import UploadUrls from "./UploadUrls.js";

const enableUploadRoutes = (app: Application) => {
    app.post(UploadUrls.profilePic, profilePicHandler)
}

export default enableUploadRoutes