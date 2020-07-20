import {User} from "./User";
import {v4 as uuid} from "uuid"
import {Message} from "./Message";
import {SocialNetwork} from "./SocialNetwork";

describe("Publishing", function () {

    it("When Alice has published messages in the past, and views her timeline, she sees the messages", function () {
        const user = new User({name: "Alice", id: uuid()})
        const message = new Message({
            messageText: "I love the weather today.",
            userId: user.id
        })
        const socialNetwork = new SocialNetwork()
        socialNetwork.publishMessage(message)

        const timeline = socialNetwork.viewTimeline({userId: user.id})
        expect(timeline).toEqual([message])
    })

})