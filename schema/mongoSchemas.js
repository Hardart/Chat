const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
	username: String,
	time: Date,
	text: String,
	avatar: String,
})

const userSchema = mongoose.Schema({
	_id: String,
	username: String,
})

module.exports = {
	MessagesArchive: mongoose.model('messages', messageSchema),
	Users: mongoose.model('users', userSchema),
}
