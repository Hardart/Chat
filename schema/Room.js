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
	}
	
	deleteUser(userObj) {
		this.users.delete(userObj)
	}

	clearHistory() {
		this.history = []
	}

	async loadHistory() {
		return await MessagesArchive.find()
	}
}

module.exports = new Room(0, 'main')
