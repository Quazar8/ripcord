export const isDev = (): boolean => {
    return process.env.NODE_ENV?.trim() === 'development'
}

export type Cookies = {
    [key:string]: string
}

export const getCookies = (headerCookie: string): Cookies => {
    if (!headerCookie) return null

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