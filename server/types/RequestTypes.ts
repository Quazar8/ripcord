import { Request } from "express";
import { UserInfo } from "./UserTypes";

export type ReqWUser = Request & {
    user: UserInfo
}