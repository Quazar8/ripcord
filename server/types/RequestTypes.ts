import { Request } from "express";
import { UserDoc } from "./UserTypes";

export type ReqWUser = Request & {
    user: UserDoc
}