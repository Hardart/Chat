const { MessagesArchive } = require('./mongoSchemas')

class Room {
	constructor(roomId, title, privateRoom = false) {
		this.roomId = roomId
		this.title = title
		this.privateRoom = privateRoom
		this.history = []
		this.users = new Set()
	}

	addMessage(message) {
		this.history.push(message)
	}

	addUser(userObj) {
		this.users.add(userObj)
		let usersArr = []
		this.users.forEach((user) => {
			usersArr.push(user)
		})
		this.history = usersArr
	}

	clearHistory() {
		this.history = []
	}

	async loadHistory() {
		return await MessagesArchive.find()
	}
}

const room = new Room(0, 'main')

module.exports = room
