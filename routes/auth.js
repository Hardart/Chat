require('dotenv').config()
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	res.render('auth', {
		title: 'Авторизация',
	})
})

router.post('/', async (req, res) => {})

module.exports = router
