import crypto from 'crypto'
import mongoose from 'mongoose'

export const { isValidObjectId } = mongoose

export const isDev = (): boolean => {
    return process.env.NODE_ENV?.trim() === 'development'
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