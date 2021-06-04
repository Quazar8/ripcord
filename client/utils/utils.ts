export const getChatDateStr = (date: Date): string => {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        + ` ${date.getHours()}:${date.getMinutes()}`
}