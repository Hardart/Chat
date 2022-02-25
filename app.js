require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').Server(app)
const mongoose = require('mongoose')
const io = require('socket.io')(server)
var cors = require('cors')
const PORT = process.env.PORT || 3000

const cookieParser = require('cookie-parser')

const { MessagesArchive } = require('./schema/mongoSchemas')
const jwt = require('jsonwebtoken')
const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next)

const indexRoute = require('./routes/index')
const loginRoute = require('./routes/login')
const regRoute = require('./routes/registration')
const testRoute = require('./routes/test')
const otherRoute = require('./routes/404')

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
io.use(wrap(cookieParser()))

app.use('/', indexRoute)
app.use('/login', loginRoute)
app.use('/registration', regRoute)
app.use('/test', testRoute)
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
