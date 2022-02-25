require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const url = require('url')
const fetch = require('node-fetch')
const apiVK = require('node-vk-bot-api/lib/api')
const { Users } = require('../schema/mongoSchemas')

router.get('/', async (req, res) => {
	if (req.cookies.access) return res.redirect('/')
	const { query } = url.parse(req.url, true)

	if (query.code) {
		const authUrl = `https://oauth.vk.com/access_token?client_id=${process.env.VK_APP_ID}&client_secret=${process.env.VK_APP_TOKEN}&redirect_uri=${process.env.VK_REDIRECT_URL}&code=${query.code}`

		const response = await fetch(authUrl, {
			method: 'GET',
		}).then((res) => res.json())

		const user = await apiVK('users.get', {
			peer_id: response.user_id,
			access_token: response.access_token,
			fields: 'photo_100',
		}).then((user) => user.response[0])

		const tokenFromVK = jwt.sign({ id: user.id, name: user.first_name, avatar: user.photo_100 }, process.env.SECRET_TOKEN)
		res.cookie('access', tokenFromVK, { httpOnly: true, expires: new Date(Date.now() + 86400e3) })
		return res.redirect('/')
	}

	if (req.headers.authorization) {
		const verifiedUser = jwt.verify(req.headers.authorization, process.env.SECRET_TOKEN)
		const user = await Users.findOne({ email: verifiedUser.email, password: verifiedUser.password })
		if (user) {
			const cookieToken = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET_TOKEN)
			return res.send({ callback: 'ok', token: cookieToken })
		}
		return res.send({ callback: 'error' })
	}

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
