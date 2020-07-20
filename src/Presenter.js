export function millisInMinute() {
    return 60 * 1000;
}

function minutesAgo(now, timestamp) {
    return (now - timestamp) / millisInMinute()
}

function secondsAgo(now, timestamp) {
    return (now - timestamp) / (1000)
}

function presentTimestamp(now, message) {
    let minutesAgoValue = minutesAgo(now, message.timestamp);
    if (minutesAgoValue === 1) {
        return "1 minute ago"
    } else if (minutesAgoValue < 1) {
        return `${secondsAgo(now, message.timestamp)} seconds ago`
    } else {
        return `${minutesAgoValue} minutes ago`
    }
}

export const Presenter = {
    present(timeline, now, socialNetwork) {
        function userName(socialNetwork, userId) {
            return socialNetwork.getUser(userId).name
        }

        return timeline.sort(message => message.timestamp)
            .map(message => `${userName(socialNetwork, message.userId)} - ${message.text} (${presentTimestamp(now, message)})`)
            .reverse()
    }
}