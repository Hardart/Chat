const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	res.render('404', {
		title: 'Страница 404',
	})
})

module.exports = router
