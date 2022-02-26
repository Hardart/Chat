require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const simpleAuth = require('../checkAuth/simple')
const fetch = require('node-fetch')

router.get('/', simpleAuth, async (req, res) => {
	if (req.cookies.access) return res.redirect('/')

	res.render('login', {
		title: 'Авторизация',
	})
})

router.post('/', async (req, res) => {
	const { mail, password } = req.body

	const token = jwt.sign({ email: mail, password: password }, process.env.SECRET_TOKEN)
	const answer = await fetch(process.env.LOCAL_REDIRECT_URL, {
		method: 'get',
		headers: {
			Authorization: token,
		},
	}).then((res) => {
		return res.json()
	})
	switch (answer.callback) {
		case 'ok':
			res.cookie('access', answer.token, { httpOnly: true, expires: new Date(Date.now() + 86400e3) })
			res.redirect('/')
			break

		case 'error':
			res.redirect('/login')
			break
	}
})

module.exports = router
