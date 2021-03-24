import { postQueryOptions } from './reqOptions'
import { LoginEntryObj } from '../../server/routes/user/userTypes'

const baseUrl = 'http://localhost:8000'

export const loginServer = async (data: LoginEntryObj) => {
    return await fetch(baseUrl + '/login', postQueryOptions(data))
        .then(res => res.json())
}