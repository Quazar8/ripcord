import { Request } from "express"

export type Cookies = {
    [key:string]: string
}

export const getCookies = (headerCookie: string): Cookies => {
    if (!headerCookie) return {}

    const cookieArr = headerCookie.split('; ')
    const cookies: Cookies = {}
    for (let strCookie of cookieArr) {
        const [name, val] = strCookie.split('=')

        if (!val) {
            console.log('Get Cookeis Method: Cookie in wrong format')
            continue
        }
        
        cookies[name] = val
    }

    return cookies
}

export const userAgentClass = (req: Request) => {
    const isMobile = () => {
        const regex = /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i
        return regex.test(req.headers["user-agent"])
    }

    return {
        isMobile
    }
}