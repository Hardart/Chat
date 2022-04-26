const fs = require('fs')

function deleteOldAvatar(req, res, next) {
	switch (true) {
		case typeof req.body.avatar === 'object':
			fs.unlink(`./${req.body.avatar.path}`, function (err) {
				if (err) return console.log(err)
			})
		case typeof req.body.oldPath === 'string':
			fs.unlink(`./public${req.body.oldPath}`, function (err) {
				if (err) return console.log(err)
			})
			break
		case (typeof req.body.path === 'string'):
			console.log(req.body)
			fs.unlink(`./public${req.body.path}`, function (err) {
				if (err) return console.log(err)
				req.delete = 'ok'
			})
			break
	}

	next()
}

module.exports = deleteOldAvatar
