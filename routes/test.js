const express = require('express')
const router = express.Router()
const uploadFile = require('../middlewears/avatar/uploadAvatar')
const deleteFile = require('../middlewears/avatar/deleteAvatar')
const resizeFile = require('../middlewears/avatar/resizeAvatar')
const imageInfo = require('image-size')
const room = require('../schema/Room')
const cors = require('cors')

router.get('/', cors(), async (req, res) => {
	const users = [
		{
			id: '622360f3c8a2e37a345854ac',
			name: 'Hardart',
			avatar: '/img/avatars/1646820793831_avatar.jpeg',
			chatId: '#1',
			iat: 1646824951,
		},
		{
			id: '622360f3c8a2e37a345854ac',
			name: 'Hardart',
			avatar: '/img/avatars/1646820793831_avatar.jpeg',
			chatId: '#1',
			iat: 1646824951,
		},
		{
			id: '622360f3c8a2e37a345854ac',
			name: 'Hardart',
			avatar: '/img/avatars/1646820793831_avatar.jpeg',
			chatId: '#1',
			iat: 1646824951,
		},
	]
	// console.log()

	// res.status(200).send(users)
	res.render('test', {
		title: 'Test page',
		user: true,
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

router.post('/avatarResize', resizeFile, deleteFile, async (req, res) => {
	if (req.resize) return res.send({ status: 'ok', path: req.resize.path })
	res.send({ status: 'error' })
})

router.post('/avatarCancel', deleteFile, async (req, res) => {
	if (req.delete) return res.send({ status: 'ok' })
	res.send({ status: 'error' })
})

module.exports = router
