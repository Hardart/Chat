const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
	username: String,
	time: Date,
	text: String,
	avatar: String,
})

module.exports = {
	MessagesArchive: mongoose.model('messages', messageSchema),
}
