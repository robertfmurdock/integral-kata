import {v4 as uuid} from "uuid"
import {User} from "./User";
import {Message} from "./Message";
import {SocialNetwork} from "./SocialNetwork";
import {Presenter} from "./Presenter";

function minute() {
    return 60 * 1000;
}

describe("Timeline", function () {

    describe("When Bob has published multiple messages", function () {
        const bob = new User({id: uuid(), name: "Bob"})

        const now = Date.now()
        const bobMessages = [
            new Message({text: "Darn! We lost!", userId: bob.id, timestamp: now - 2 * minute()}),
            new Message({text: "Good game though.", userId: bob.id, timestamp: now - minute()}),
        ]

        let socialNetwork;

        beforeEach(function () {
            socialNetwork = new SocialNetwork()
            bobMessages.forEach(message => socialNetwork.publishMessage(message))
        })

        it("when Alice view Bob's timeline she seems the messages with their timestamps", function () {
            const alice = new User({id: uuid(), name: "Alice"})

            const bobsTimeline = socialNetwork.viewTimeline(bob.id, alice);
            expect(bobsTimeline).toEqual(bobMessages)

            const presentedTimeline = Presenter.present(bobsTimeline)

            expect(presentedTimeline).toEqual([
                "Good game though. (1 minute ago)",
                "Darn! We lost! (2 minute ago)"
            ])
        })

    })

})