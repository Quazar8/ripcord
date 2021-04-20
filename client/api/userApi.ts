import { baseUrl, postQueryOptions, getQueryOptions } from './reqOptions'
import { LoginEntryObj, UserLoggedObj } from '../../server/routes/user/userTypes'
import { ServerResponse } from '../../server/responses'

export const loginServer = async (data: LoginEntryObj): Promise<ServerResponse<UserLoggedObj>> => {
    const res = await fetch(baseUrl + '/user/login', postQueryOptions(data))
    return res.json()
}

export const getUseInfoIfLogged = async (): Promise<ServerResponse<UserLoggedObj>> => {
    return (await fetch(baseUrl + '/user/loggedUserInfo', getQueryOptions(true))).json()
}