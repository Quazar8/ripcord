import { Request } from "express";
import { UserInfo } from "../routes/user/UserTypes";

export type ReqWUser = Request & {
    user: UserInfo
}