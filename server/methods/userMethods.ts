import { ProfilePicJson, UserDoc, UserStatus } from "../types/UserTypes.js"
import { isOnline } from "../websocket/onlineUsers.js"
import { genRandomNum } from "./utils.js"

export const genProfilePicColorJson = (username: string): ProfilePicJson => {
    const genHslStr = ({ hue, sat, light }: typeof background) => {
        return `hsl(${hue}, ${sat}%, ${light}%)`
    }

    const background = {
        hue: genRandomNum(0, 360),
        sat: genRandomNum(10, 90),
        light: genRandomNum(26, 65)
    }

    const color = {
        hue: (background.hue + genRandomNum(65, 295)) % 360,
        sat: 100 - background.sat,
        light: 100 - background.light
    }

    return {
        background: genHslStr(background),
        textColor: genHslStr(color),
        letters: username[0]
    }
}

export const getUserStatus = (user: UserDoc) => {
    if (isOnline(user._id)) {
        return user.onlineStatus
    }

    return UserStatus.Offline
}