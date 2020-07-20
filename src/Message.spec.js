import {v4 as uuid} from "uuid"
import {Message} from "./Message";

describe("Message", function() {

    it("can be constructed as a data class from raw object", function() {
        const userId = uuid();
        const text = "I bless the rains.";
        const timestamp = Date.now()
        const message = new Message({userId, text, timestamp});

        expect(message.userId).toBe(userId)
        expect(message.text).toBe(text)
        expect(message.timestamp).toBe(timestamp)
    })

})