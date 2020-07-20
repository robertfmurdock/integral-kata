let allMessages = []

export class SocialNetwork {

    publishMessage(message) {
        allMessages.push(message)
    }

    viewTimeline(id) {
        return allMessages.filter(element => element.userId === id);
    }
}