import { Request } from "express";
import { IUserDoc } from "../db/models/user";

export type ReqWUser = Request & {
    user: IUserDoc
}