import {v4 as uuid} from "uuid"
import {Message} from "./Message";

describe("Message", function() {

    it("can be constructed as a data class from raw object", function() {
        const userId = uuid();
        const text = "I bless the rains.";
        const message = new Message({userId: userId, text: text});

        expect(message.userId).toBe(userId)
        expect(message.text).toBe(text)
    })

})