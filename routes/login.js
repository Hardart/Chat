require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const simpleAuth = require('../middlewears/checkAuth/simple')
const fetch = require('node-fetch')

router.get('/', simpleAuth, async (req, res) => {
	if (req.user) return res.send({ callback: 'ok', token: req.token })
	if (req.cookies.access) return res.redirect('/')

	res.render('login', {
		title: 'Авторизация',
		user: true,
	})
})

router.post('/', async (req, res) => {
	const { mail, password } = req.body
	const token = jwt.sign({ email: mail, password: password }, process.env.SECRET_TOKEN)
	const auth = await fetch(process.env.LOCAL_REDIRECT_URL, {
		method: 'get',
		headers: {
			Authorization: token,
		},
	}).then((res) => {
		return res.json()
	})
	switch (auth.callback) {
		case 'ok':
			res.cookie('access', auth.token, { httpOnly: true, expires: new Date(Date.now() + 86400e3) })
			res.redirect('/')
			break
		case 'error':
			res.redirect('/login')
			break
		case 'noUser':
			res.render('login', {
				title: 'Авторизация',
				user: false,
				mess: `Логин или пароль не верны`,
			})
			break
	}
})

module.exports = router
