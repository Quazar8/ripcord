export const isDev = (): boolean => {
    return process.env.NODE_ENV?.trim() === 'development'
}