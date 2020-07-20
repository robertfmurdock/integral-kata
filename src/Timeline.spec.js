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
            socialNetwork.register(bob)
            bobMessages.forEach(message => socialNetwork.publishMessage(message))
        })

        it("when Alice view Bob's timeline she seems the messages with their timestamps", function () {
            const alice = new User({id: uuid(), name: "Alice"})

            const bobsTimeline = socialNetwork.viewTimeline({userId: alice.id, target: bob.id});
            expect(bobsTimeline).toEqual(bobMessages)

            const presentedTimeline = Presenter.present(bobsTimeline, now, socialNetwork)

            expect(presentedTimeline).toEqual([
                "Bob - Good game though. (1 minute ago)",
                "Bob - Darn! We lost! (2 minutes ago)"
            ])
        })

    })

})