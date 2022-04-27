require('dotenv').config()
const express = require('express')
const router = express.Router()
const cleanRoomUsers = require('../middlewears/avatar/cleanRoomUsers')
const simpleAuth = require('../middlewears/checkAuth/simple')
const mainPageApi = require('../controllers/index-controller')



router.get('/', cleanRoomUsers, mainPageApi.chat)
router.get('/login', simpleAuth, mainPageApi.login)
router.post('/login', mainPageApi.loginPost)
router.post('/logout', mainPageApi.logout)

module.exports = router
