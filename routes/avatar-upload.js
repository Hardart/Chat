const express = require('express')
const router = express.Router()
const avatarApi = require('../controllers/changeAvatar-controller')
const uploadFile = require('../middlewears/avatar/uploadAvatar')
const deleteOldFile = require('../middlewears/avatar/deleteAvatar')
const resizeFile = require('../middlewears/avatar/resizeAvatar')


router.post('/upload', uploadFile.single('avatar'), avatarApi.upload)
router.post('/resize', resizeFile, deleteOldFile, avatarApi.resize)
router.post('/cancel', deleteOldFile, avatarApi.pressCancelBtn)

module.exports = router
