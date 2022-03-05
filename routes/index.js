require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { promises: Fs } = require('fs')
const room = require('../schema/Room')

router.get('/', async (req, res) => {
	if (req.cookies.access) {
		const verifiedUser = jwt.verify(req.cookies.access, process.env.SECRET_TOKEN)
		room.addUser(`${verifiedUser.id}=${verifiedUser.name}`)
		let avatar
		try {
			await Fs.access(`./public${verifiedUser.avatar}`)
			avatar = verifiedUser.avatar
		} catch {
			avatar = process.env.AVATAR_PLACEHOLDER
		}
		res.render('index', {
			title: 'Чат',
			username: verifiedUser.name,
			avatar: avatar,
			chatId: verifiedUser.chatId,
		})
	} else {
		res.redirect('/login')
	}
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
