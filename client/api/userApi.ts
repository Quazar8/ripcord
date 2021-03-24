import { baseUrl, postQueryOptions } from './reqOptions'
import { LoginEntryObj } from '../../server/routes/user/userTypes'

export const loginServer = async (data: LoginEntryObj) => {
    return await fetch(baseUrl + '/login', postQueryOptions(data))
        .then(res => res.json())
}