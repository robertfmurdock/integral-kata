export class Message {
    constructor(params) {
        const {userId, text, timestamp} = params
        this.userId = userId
        this.text = text
        this.timestamp = timestamp
    }

}