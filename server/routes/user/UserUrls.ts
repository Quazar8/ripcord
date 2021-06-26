export default {
    login: '/user/login',
    register: '/user/register',
    getLoggedUser: '/user/loggedUserInfo',
    logout: '/user/logout',
    findFriend: '/user/find/friend',
    pendingFriendRequests: '/user/friends/pending',
    declineFriendRequest: '/user/friends/decline',
    acceptFriendRequest: '/user/friends/accept',
    getFriends: '/user/friends/list',
    getProfilePicFn: (filename: string) => (
        `/static/profilePics/${filename}`
    ),
    unfriendUserFn: (userId: string) => (
        `/user/unfriend/${userId}`
    )
}