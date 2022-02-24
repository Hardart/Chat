const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
	username: String,
	time: Date,
	text: String,
	avatar: String,
})

const userSchema = mongoose.Schema({
	email: String,
	name: String,
	password: String,
})

module.exports = {
	MessagesArchive: mongoose.model('messages', messageSchema),
	Users: mongoose.model('users', userSchema),
}
