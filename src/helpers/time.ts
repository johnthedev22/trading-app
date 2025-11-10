const timeOfDayMessage = (): string => {
    const hours = new Date().getHours()

    if(hours >= 12 && hours < 18) return "Good afternoon and"
    else if(hours >= 18 && hours <= 23) return "Good evening and"

    return "Good morning and"
}

export { timeOfDayMessage }