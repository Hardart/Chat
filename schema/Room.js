const { MessagesArchive } = require('./History')

class Room {
	constructor(roomId, title, privateRoom = false) {
		this.roomId = roomId
		this.title = title
		this.privateRoom = privateRoom
		this.history = []
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

module.exports = Room
