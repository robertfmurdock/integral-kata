import {User} from "./User";
import {v4 as uuid} from "uuid"
import {socialNetwork} from "./socialNetwork"
import {Message} from "./Message";

describe("Publishing", function () {

    it("When Alice has published messages in the past, and views her timeline, she sees the messages", function () {
        const user = new User({name: "Alice", id: uuid()})
        const message = new Message({
            messageText: "I love the weather today.",
            userId: user.id
        })
        socialNetwork.publishMessage(message)

        const timeline = socialNetwork.viewTimeline(user.id)
        expect(timeline).toEqual([message])
    })

})