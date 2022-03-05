require('dotenv').config()
const express = require('express')
const router = express.Router()
const { Users } = require('../schema/mongoSchemas')

router.get('/', async (req, res) => {
	res.render('registration', {
		title: 'Авторизация',
	})
})

router.post('/', async (req, res) => {
	const { email, name, password } = req.body
	let chatID = await Users.count()
	const user = new Users({
		email: email,
		name: name,
		password: password,
		chatId: `#${chatID + 1}`,
	})

	await user.save()
	res.redirect('/login')
})

module.exports = router
