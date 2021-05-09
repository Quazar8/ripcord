import { Request } from "express";
import { IUserDoc } from "../db/models/models";

export type ReqWUser = Request & {
    user: IUserDoc
}