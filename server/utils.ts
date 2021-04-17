export const isDev = (): boolean => {
    return process.env.NODE_ENV?.trim() === 'development'
}

export type Cookies = {
    [key:string]: string
}

export const getCookies = (headerCookie: string): Cookies => {
    let cookieArr = headerCookie.split(', ')
    let cookies: Cookies = {}
    for (let strCookie of cookieArr) {
        let [name, val] = strCookie.split('=')
        cookies[name] = val
    }

    return cookies
}