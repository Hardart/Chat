const fs = require('fs')

function deleteOldAvatar(req, res, next) {
	if (req.body.avatar) {
		fs.unlink(`./${req.body.avatar.path}`, function (err) {
			if (err) return console.log(err)
		})
	}
	if (req.body.oldPath) {
		fs.unlink(`./public${req.body.oldPath}`, function (err) {
			if (err) return console.log(err)
		})
	}

	if (req.body.path) {
		fs.unlink(`./public${req.body.path}`, function (err) {
			if (err) return console.log(err)
			req.delete = 'ok'
		})
	}
	next()
}

module.exports = deleteOldAvatar
