import { baseUrl, postQueryOptions } from './reqOptions'
import { LoginEntryObj } from '../../server/routes/user/userTypes'

export const loginServer = async (data: LoginEntryObj) => {
    const res = await fetch(baseUrl + '/user/login', postQueryOptions(data))
    return res.json()
}