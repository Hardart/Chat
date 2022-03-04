require('dotenv').config()
const sharp = require('sharp')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const { Users } = require('../../schema/mongoSchemas')

async function resize(req, res, next) {
	if (req.body.avatar) {
		const image = req.body.avatar
		const path = image.path.match(/(.*)\./)[1] // путь файла без расширения
		const ext = image.path.match(/\.(.*)/)[0] // расширение -> .jpg
		const newName = `${path}_avatar${ext}`
		const exctractTop = Math.round((image.newH - image.borderWidth) / 2 - image.posY)
		const exctractLeft = Math.round((image.newW - image.borderWidth) / 2 - image.posX)
		const verifiedUser = jwt.verify(req.cookies.access, process.env.SECRET_TOKEN)

		await sharp(`./${image.path}`)
			.resize({
				width: Math.ceil(image.newW),
				height: Math.ceil(image.newH),
			})
			.extract({
				left: exctractLeft,
				top: exctractTop,
				width: image.borderWidth,
				height: image.borderWidth,
			})
			.toFile(newName)

		req.resize = { path: newName.match(/public(.*)/)[1] }

		const user = await Users.findOne({ _id: verifiedUser.id })
		user.avatar = req.resize.path
		await user.save()
		req.resize.token = jwt.sign({ id: user._id, name: user.name, avatar: user.avatar }, process.env.SECRET_TOKEN)
		res.cookie('access', req.resize.token, { httpOnly: true, expires: new Date(Date.now() + 86400e3) })
	}

	next()
}

module.exports = resize
