require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { Users } = require('../schema/mongoSchemas')
const archive = require('../schema/Room')

router.get('/', async (req, res) => {
	let name = ''
	if (req.cookies.access) {
		const verifiedUser = jwt.verify(req.cookies.access, process.env.SECRET_TOKEN)
		name = verifiedUser.name
	}

	res.render('index', {
		title: 'Чат',
		name: name,
	})
})

router.post('/', async (req, res) => {
	const { id, name } = req.body
	const userToSave = new Users({
		_id: id,
		username: name,
	})
	archive.users.add(id)
	await userToSave.save()
	const token = jwt.sign({ id: id, name: name }, process.env.SECRET_TOKEN)
	res.cookie('access', token, { httpOnly: true, expires: new Date(Date.now() + 86400e3) })
	res.send({ status: 'ok', users: archive.users.size })
})

router.post('/logout', async (req, res) => {
	if (req.cookies.access) {
		const user = jwt.verify(req.cookies.access, process.env.SECRET_TOKEN)
		archive.users.delete(user.id)
	}
	res.clearCookie('access')

	res.send({ callback: 'ok' })
})

module.exports = router
