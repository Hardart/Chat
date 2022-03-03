const sharp = require('sharp')

function resize(req, res, next) {
	console.log(req.file)

	// sharp('./ava_1.jpg')
	// 	.resize({
	// 		width: 507,
	// 		height: 284,
	// 	})
	// 	.extract({
	// 		left: 61,
	// 		top: 13,
	// 		width: 258,
	// 		height: 258,
	// 	})
	// 	.toFile('ava_small.jpg')
	next()
}

module.exports = resize
