require('dotenv').config()
const express = require('express')
const router = express.Router()
const { promises: Fs } = require('fs')
const cleanRoomUsers = require('../middlewears/avatar/cleanRoomUsers')

router.get('/', cleanRoomUsers, async (req, res) => {
	const user = req.user
	let avatar
	try {
		await Fs.access(`./public${user.avatar}`)
		avatar = user.avatar
	} catch {
		avatar = process.env.AVATAR_PLACEHOLDER
	}
	res.render('index', {
		title: 'Чат',
		username: user.name,
		avatar: avatar,
		chatId: user.chatId,
	})
})

router.post('/logout', async (req, res) => {
	if (req.cookies.access) {
		const user = jwt.verify(req.cookies.access, process.env.SECRET_TOKEN)
		room.users.delete(`${user.id}=${user.name}`)
	}
	res.clearCookie('access')
	res.send({ callback: 'ok' })
})

module.exports = router
