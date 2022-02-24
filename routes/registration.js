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
	const user = new Users({
		email: email,
		name: name,
		password: password,
	})

	await user.save()
	res.redirect('/login')
})

module.exports = router
