require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { Users } = require('../schema/mongoSchemas')

router.get('/', async (req, res) => {
	if (req.cookies.access) {
		const room = require('../schema/Room')
		const verifiedUser = jwt.verify(req.cookies.access, process.env.SECRET_TOKEN)
		room.addUser(`${verifiedUser.id}=${verifiedUser.name}`)
		res.render('index', {
			title: 'Чат',
			name: verifiedUser.name,
		})
	} else {
		res.redirect('/login')
	}
})

router.post('/', async (req, res) => {
	// const { id, name } = req.body
	// room.users.add(id)
	// const token = jwt.sign({ id: id, name: name }, process.env.SECRET_TOKEN)
	// res.cookie('access', token, { httpOnly: true, expires: new Date(Date.now() + 86400e3) })
	// res.send({ status: 'ok', users: room.users.size })
})

router.post('/logout', async (req, res) => {
	if (req.cookies.access) {
		const user = jwt.verify(req.cookies.access, process.env.SECRET_TOKEN)
		room.users.delete(user.id)
	}
	res.clearCookie('access')
	res.send({ callback: 'ok' })
})

module.exports = router
