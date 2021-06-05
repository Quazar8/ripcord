export const getChatDateStr = (date: Date): string => {
    let calendarDate: string;

    const day = date.getDate()
    const today = new Date().getDate()
    if (day === today) {
        calendarDate = 'Today at'
    } else if (day === today - 1) {
        calendarDate = 'Yesterday at'
    } else {
        calendarDate = `${day}/${date.getMonth()}/${date.getFullYear()}`
    }

    return `${calendarDate} ${date.getHours()}:${date.getMinutes()}`
}