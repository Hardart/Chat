const sharp = require('sharp')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const { Users } = require('../../schema/mongoSchemas')

async function resize(req, res, next) {
	if (req.body.avatar) {
		const image = req.body.avatar
		const path = image.path.match(/(.*)\./)[1]
		const ext = image.path.match(/\.(.*)/)[0]
		const newName = `${path}_avatar${ext}`
		const exctractTop = Math.round((image.newH - image.borderWidth) / 2 - image.posY)
		const exctractLeft = Math.round((image.newW - image.borderWidth) / 2 - image.posX)
		const verifiedUser = jwt.verify(req.cookies.access, process.env.SECRET_TOKEN)
		const user = await Users.findOne({ _id: verifiedUser.id })

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

		fs.unlink(`./${image.path}`, function (err) {
			if (err) return console.log(err)
			console.log('file deleted successfully')
		})
		req.resize = { path: newName.match(/public(.*)/)[1] }
		user.avatar = newName
		await user.save()
	}

	next()
}

module.exports = resize
