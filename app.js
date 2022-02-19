require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').Server(app)
const mongoose = require('mongoose')
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000
const cookieParser = require('cookie-parser')
const Room = require('./schema/Room')
const { MessagesArchive } = require('./schema/History')
const mainRoom = new Room(0, 'main')

const indexRoute = require('./routes/index')
const otherRoute = require('./routes/404')

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', indexRoute)
app.use('*', otherRoute)

async function start() {
	try {
		await mongoose.connect(
			process.env.DB_CONN,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			() => console.log('БД подключена\n====================================')
		)
		server.listen(PORT, () => {
			console.log('====================================\nСервер запущен\n====================================')
		})
	} catch (e) {
		console.log(e)
	}
}

start()

io.on('connection', async (socket) => {
	let count = io.engine.clientsCount
	io.emit('clients-count', count)
	console.log(socket.handshake.headers.cookie)
	socket.join(mainRoom.title)

	socket.on('disconnect', () => {
		socket.leave(mainRoom.title)
		socket.broadcast.emit('clients-disconnect', --count)
	})

	socket.on('newMessage', async (data) => {
		const messageStruct = new MessagesArchive({
			username: data.username,
			time: new Date(),
			text: data.text,
			avatar: 'https://via.placeholder.com/30',
		})

		await messageStruct.save()

		io.emit('sendMessage', messageStruct)
	})

	socket.emit('messageHistory', await mainRoom.loadHistory())
})
