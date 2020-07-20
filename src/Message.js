export class Message {
    constructor(params) {
        const {userId, text} = params
        this.userId = userId
        this.text = text
    }

}