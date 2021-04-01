import { baseUrl, postQueryOptions } from './reqOptions'
import { LoginEntryObj, UserLoggedObj } from '../../server/routes/user/userTypes'
import { ServerResponse } from '../../server/responses'

export type LoginResponse = Promise<ServerResponse<UserLoggedObj>>

export const loginServer = async (data: LoginEntryObj): LoginResponse => {
    const res = await fetch(baseUrl + '/user/login', postQueryOptions(data))
    return res.json()
}