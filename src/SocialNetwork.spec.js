import {SocialNetwork} from "./SocialNetwork";
import {v4 as uuid} from "uuid"
import {Message} from "./Message";

describe("social network", function () {

    it("when messages from different users are saved, will filter timelines by given user id", function () {
        let userId1 = uuid();
        let userId2 = uuid();
        let userId3 = uuid();

        const expectedMessage = new Message({userId: userId2, text: "2"});
        const messages = [
            new Message({userId: userId1, text: "1"}),
            expectedMessage,
            new Message({userId: userId3, text: "3"}),
        ]
        const socialNetwork = new SocialNetwork()

        messages.forEach(element =>
            socialNetwork.publishMessage(element)
        )

        const timeline2 = socialNetwork.viewTimeline({userId: userId2})

        expect(timeline2).toEqual([expectedMessage])

    })


})