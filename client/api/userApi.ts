import { baseUrl, postQueryOptions, getQueryOptions } from './reqOptions'
import { LoginEntryObj, UserLoggedObj } from '../../server/routes/user/userTypes'
import { ServerResponse } from '../../server/responses'
import UserUrls from '../../server/routes/user/UserUrls'

export const loginServer = async (data: LoginEntryObj): Promise<ServerResponse<UserLoggedObj>> => {
    const res = await fetch(baseUrl + UserUrls.login, postQueryOptions(data))
    return res.json()
}

export const getUserInfoWToken = async (): Promise<ServerResponse<UserLoggedObj>> => {
    return (await fetch(baseUrl + UserUrls.getLoggedUser, getQueryOptions(true))).json()
}

export const logoutUser = async (): Promise<ServerResponse<Object>> => {
    return (await fetch(baseUrl + UserUrls.logout, getQueryOptions(true))).json()
}