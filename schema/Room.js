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

	clearHistory() {
		this.history = []
	}

	async loadHistory() {
		return await MessagesArchive.find()
	}
}

const archive = new Room(0, 'main')

module.exports = archive
