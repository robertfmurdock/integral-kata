import {v4 as uuid} from 'uuid'
import {User} from "./User";

describe("User", function() {

    it("can be constructed as a data class from raw object", function() {
        const userId = uuid();
        const name = "Jim";
        const message = new User({id: userId, name: name});
        expect(message.name).toBe(name)
        expect(message.id).toBe(userId)
    })

})