require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').Server(app)
const mongoose = require('mongoose')
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { MessagesArchive } = require('./schema/mongoSchemas')
const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next)

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
io.use(wrap(cookieParser()))

app.use('/', require('./routes/index'))
app.use('/login', require('./routes/login'))
app.use('/registration', require('./routes/registration'))
app.use('/test', require('./routes/test'))
app.use('*', require('./routes/404'))

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
	const room = require('./schema/Room')
	socket.join(room.title)
	io.emit('clients-count', [...room.users])

	socket.on('disconnect', () => {
		socket.leave(room.title)
		socket.broadcast.emit('clients-disconnect', [...room.users])
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

	socket.emit('messageHistory', await room.loadHistory())
})
