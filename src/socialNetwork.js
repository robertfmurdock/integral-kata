let allMessages = []

export const socialNetwork = {
    publishMessage(message) {
        allMessages.push(message)
    },
    viewTimeline(id) {
        return allMessages;
    }
}