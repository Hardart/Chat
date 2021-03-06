require('dotenv').config()
const express = require('express')
const router = express.Router()
const cleanRoomUsers = require('../middlewears/avatar/cleanRoomUsers')
const checkAvatar = require('../middlewears/avatar/checkAvatar')
const simpleAuth = require('../middlewears/checkAuth/simple')
const renderPage = require('../controllers/route-controller')
const pagesApi = require('../api/pages-api')


router.get('/', cleanRoomUsers, checkAvatar, renderPage.main)
router.get('/login', simpleAuth, renderPage.login)
router.get('/registration', renderPage.registration)
router.get('/registration', renderPage.registration)
router.get('*', renderPage.unknown)

router.post('/login', pagesApi.login)
router.post('/logout', pagesApi.logout)
router.post('/registration', pagesApi.registration)

module.exports = router
