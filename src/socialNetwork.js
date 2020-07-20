let allMessages = []

export const socialNetwork = {
    publishMessage(message) {
        allMessages.push(message)
    },
    viewTimeline(id) {
        return allMessages.filter(element => element.userId === id);
    }
}