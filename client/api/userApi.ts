import { baseUrl, postQueryOptions, getQueryOptions } from './reqOptions'
import { LoginEntry } from '../../server/types/userTypes'
import UserUrls from '../../server/routes/user/UserUrls'

import { LoginResponse,
         RegisterResponse, 
         LogoutResponse, 
         UserFromTokenResponse, 
         AddFriendRes,
         PendingFriendsRes, 
         DeclineFriendRequestRes,
         AcceptFriendRequestRes} from '../../server/routes/user/ResponseTypes'

import { DeclineFriendRequestData,
         AcceptFriendRequestData } from '../../server/types/UserRequestData'

export const loginServer = async (data: LoginEntry): Promise<LoginResponse> => {
    const res = await fetch(baseUrl + UserUrls.login, postQueryOptions(data))
    return res.json()
}

export const registerUser = async(data: LoginEntry): Promise<RegisterResponse> => {
    return (await fetch(baseUrl + UserUrls.register, postQueryOptions(data))).json()
}

export const getUserInfoWToken = async (): Promise<UserFromTokenResponse> => {
    return (await fetch(baseUrl + UserUrls.getLoggedUser, getQueryOptions(true))).json()
}

export const logoutUser = async (): Promise<LogoutResponse> => {
    return (await fetch(baseUrl + UserUrls.logout, getQueryOptions(true))).json()
}

export const addFriend = async (username: string): Promise<AddFriendRes> => {
    let url = baseUrl + UserUrls.findFriend
    url += `?username=${username}`

    return (await fetch(url, getQueryOptions(true))).json()
}

export const getFriendRequests = async (): Promise<PendingFriendsRes> => {
    return (await fetch(baseUrl + UserUrls.pendingFriendRequests, getQueryOptions(true))).json()
}

export const cancelOrDeclineFrReq = async (data: DeclineFriendRequestData): Promise<DeclineFriendRequestRes> => {
    return (await fetch(baseUrl + UserUrls.declineFriendRequest, postQueryOptions(data))).json()
}

export const acceptFriendRequest = async (data: AcceptFriendRequestData): Promise<AcceptFriendRequestRes> => {
    return (await fetch(baseUrl + UserUrls.acceptFriendRequest, postQueryOptions(data))).json()
}