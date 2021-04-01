import { baseUrl, postQueryOptions } from './reqOptions'
import { LoginEntryObj, UserLoggedObj } from '../../server/routes/user/userTypes'
import { ServerResponse } from '../../server/responses'

export const loginServer = async (data: LoginEntryObj): Promise<ServerResponse<UserLoggedObj>> => {
    const res = await fetch(baseUrl + '/user/login', postQueryOptions(data))
    return res.json()
}