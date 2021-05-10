import { Types } from "mongoose";
import { IUserModel } from "../db/models/models";

export type RecipientInfo = Pick<IUserModel, 'username'> & {
    id: Types.ObjectId
}

export type Message = {
    authorId: Types.ObjectId,
    authorName: string,
    date: Date,
    edited: boolean
}