require('dotenv').config()
const express = require('express')
const router = express.Router()
const url = require('url')
const fetch = require('node-fetch')
const apiVK = require('node-vk-bot-api/lib/api')

router.get('/', async (req, res) => {
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

		return res.redirect('/')
	}

	res.render('auth', {
		title: 'Авторизация',
	})
})

router.post('/', async (req, res) => {})

module.exports = router
