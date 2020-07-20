export class SocialNetwork {
    allMessages = []

    users = []
    followRelationships = {}

    register(user) {
        this.users.push(user)
    }

    publishMessage(message) {
        this.allMessages.push(message)
    }

    viewTimeline({userId, target}) {
        let followerList;

        if (!target) {
            followerList = this.follows(userId);
        } else {
            followerList = [target]
        }

        return this.allMessages.filter(element => followerList.includes(element.userId));
    }

    follow({userId, target}) {
        let followRelationship = this.follows(userId);
        followRelationship.push(target)
    }

    follows(userId) {
        const followRelationship = this.followRelationships[userId];
        if (followRelationship)
            return followRelationship;
        else {
            return this.followRelationships[userId] = [userId]
        }
    }
}