import { postQueryOptions } from './reqOptions'

const baseUrl = 'http://localhost:8000'

export const loginServer = async (data) => {
    return await fetch(baseUrl + '/login', postQueryOptions(data))
        .then(res => res.json())
}