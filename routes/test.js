const express = require('express')
const router = express.Router()
const uploadFile = require('../upload')
const resizeFile = require('../sharp_test')
const imageInfo = require('image-size')

router.get('/', async (req, res) => {
	res.render('test', {
		title: 'Тестовая страница',
	})
})

router.post('/', uploadFile.single('avatar'), resizeFile, async (req, res) => {
	if (req.file) {
		let file = req.file
		let result = imageInfo('./' + file.path)

		file.width = result.width
		file.height = result.height
		return res.json(file)
	}
	res.send({ status: 'error' })
})

module.exports = router
