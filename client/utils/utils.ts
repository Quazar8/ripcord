export const getChatDateStr = (date: Date): string => {
    let calendarDate: string;

    const day = date.getDate()
    const today = new Date().getDate()
    if (day === today) {
        calendarDate = 'Today at'
    } else if (day === today - 1) {
        calendarDate = 'Yesterday at'
    } else {
        calendarDate = `${day}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    let hours = date.getHours()
    let minutes = date.getMinutes()
    let hoursStr = hours < 10 ? '0' + hours : '' + hours
    let minutesStr = minutes < 10 ? '0' + minutes : '' + minutes



    return `${calendarDate} ${hoursStr}:${minutesStr}`
}

export const getDateUTC = (date: Date) => {
    return Date.UTC(date.getFullYear(), date.getMonth(),
        date.getDate(), date.getHours(), date.getMinutes())
}

export const getDateDiffInMin = (a: Date, b: Date) => {
    return Math.floor((getDateUTC(a) - getDateUTC(b)) / 60000)
}