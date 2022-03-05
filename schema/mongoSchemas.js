const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
	userId: String,
	username: String,
	time: Date,
	text: String,
	avatar: String,
})

const userSchema = mongoose.Schema({
	email: String,
	name: String,
	password: String,
	avatar: {
		type: String,
		default: '/img/placeholders/avatar.png',
	},
	chatId: String,
})

module.exports = {
	MessagesArchive: mongoose.model('messages', messageSchema),
	Users: mongoose.model('users', userSchema),
}
