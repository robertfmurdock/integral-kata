export class SocialNetwork {
    allMessages = []

    users = []
    followRelationships = {}

    register(user) {
        this.users.push(user)
    }

    getUser(userId) {
        return this.users.find(user => user.id === userId)
    }

    publishMessage(message) {
        this.allMessages.push(message)
    }

    viewTimeline({userId, target}) {
        let timelineTargetList;

        if (!target) {
            timelineTargetList = this.follows(userId);
        } else {
            timelineTargetList = [target]
        }

        return this.allMessages.filter(element => timelineTargetList.includes(element.userId));
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