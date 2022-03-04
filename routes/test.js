const express = require('express')
const router = express.Router()
const uploadFile = require('../middlewears/avatar/uploadAvatar')
const resizeFile = require('../middlewears/avatar/resizeAvatar')
const imageInfo = require('image-size')

router.get('/', async (req, res) => {
	res.render('test', {
		title: 'Тестовая страница',
	})
})

router.post('/avatarUpload', uploadFile.single('avatar'), async (req, res) => {
	if (req.file) {
		let file = req.file
		let result = imageInfo('./' + file.path)

		file.width = result.width
		file.height = result.height
		return res.json(file)
	}
	res.send({ status: 'error' })
})

router.post('/avatarResize', resizeFile, async (req, res) => {
	if (req.resize) return res.send({ status: 'ok', path: req.resize.path })
	res.send({ status: 'error' })
})

module.exports = router
