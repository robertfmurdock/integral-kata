export function millisInMinute() {
    return 60 * 1000;
}

function minutesAgo(now, timestamp) {
    return (now - timestamp) / millisInMinute()
}

export const Presenter = {
    present(timeline, now) {
        return timeline.sort(message => message.timestamp)
            .map(message => `${message.text} (${minutesAgo(now, message.timestamp)} minute ago)`)
            .reverse()
    }
}