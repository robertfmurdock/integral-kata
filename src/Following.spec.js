import {User} from "./User";
import {uuid} from "./uuid";
import {SocialNetwork} from "./SocialNetwork";
import {Message} from "./Message";
import {millisInMinute, Presenter} from "./Presenter";

function minutes(number) {
    return number * millisInMinute();
}

function minutesAgo(now, number) {
    return now - minutes(number);
}

describe("Following", function () {
    const alice = new User({id: uuid(), name: "Alice"})
    const bob = new User({id: uuid(), name: "Bob"})
    const charles = new User({id: uuid(), name: "Charles"})
    const users = [alice, bob, charles]

    const now = Date.now()

    it("Given active users, Charles can see a timeline populated by all of his followers", function () {
        const socialNetwork = new SocialNetwork();
        users.forEach(user => socialNetwork.register(user))

        socialNetwork.publishMessage(new Message({
            userId: alice.id,
            text: "I love the weather today",
            timestamp: minutesAgo(now, 5)
        }))

        socialNetwork.publishMessage(new Message({
            userId: bob.id,
            text: "Darn! We lost!",
            timestamp: minutesAgo(now, 2)
        }))

        socialNetwork.publishMessage(new Message({
            userId: bob.id,
            text: "Good game though",
            timestamp: minutesAgo(now, 1)
        }))
        socialNetwork.publishMessage(new Message({
            userId: charles.id,
            text: "I'm in New York today! Anyone wants to have a coffee?",
            timestamp: now - (15 * 1000)
        }))

        socialNetwork.follow({userId: charles.id, target: alice.id})
        socialNetwork.follow({userId: charles.id, target: bob.id})

        const timeline = socialNetwork.viewTimeline({userId: charles.id})

        expect(Presenter.present(timeline))
            .toEqual([
                "Charlie - I'm in New York today! Anyone wants to have a coffee? (15 seconds ago)",
                "Bob - Good game though. (1 minute ago)",
                "Bob - Damn! We lost! (2 minutes ago)",
                "Alice - I love the weather today (5 minutes ago)",
            ])
    })

})