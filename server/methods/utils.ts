import crypto from 'crypto'
import mongoose from 'mongoose'

export const { isValidObjectId } = mongoose

export const isDev = (): boolean => {
    return process.env.NODE_ENV?.trim() === 'development'
}

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

export const tryCatchWrapper = (fn: CallableFunction): boolean => {
    try {
        fn()
        return true
    }
    catch(err) {
        console.error(err)
        return false
    }
}

export const genId = (bytes: number): string => {
    return crypto.randomBytes(bytes).toString('hex')
}

export const genRandomNum = (lower: number, upper: number): number => {
    return Math.round(lower + Math.random() * (upper - lower))
}