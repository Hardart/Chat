require('dotenv').config()
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	res.render('test', {
		title: 'Тестовая страница',
	})
})

module.exports = router
