import {v4 as uuid} from "uuid"
import {User} from "./User";
import {Message} from "./Message";
import {SocialNetwork} from "./SocialNetwork";

describe("Timeline", function () {

    describe("When Bob has published multiple messages", function () {
        const bob = new User({id: uuid(), name: "Bob"})

        const messageText = [
            "Darn! We lost!",
            "Good game though."
        ]

        const bobMessages = messageText.map(text => new Message({text, userId: bob.id}))

        let socialNetwork;

        beforeEach(function () {
            socialNetwork = new SocialNetwork()
            bobMessages.forEach(message => socialNetwork.publishMessage(message))
        })

        it("when Alice view Bob's timeline she seems the messages with their timestamps", function () {
            const alice = new User({id: uuid(), name: "Alice"})

            const bobsTimeline = socialNetwork.viewTimeline(bob.id, alice);

            expect(bobsTimeline).toEqual(
                bobMessages
            )

        })

    })

})