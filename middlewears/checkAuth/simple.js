const { Users } = require('../../schema/mongoSchemas')
const jwt = require('jsonwebtoken')

async function simpleAuth(req, res, next) {
	if (req.headers.authorization) {
		const verifiedUser = jwt.verify(req.headers.authorization, process.env.SECRET_TOKEN)
		const user = await Users.findOne({ email: verifiedUser.email, password: verifiedUser.password })

		if (!user) return res.send({ callback: 'noUser' })

		const cookieToken = jwt.sign({ id: user._id, name: user.name, avatar: user.avatar, chatId: user.chatId }, process.env.SECRET_TOKEN)
		req.user = user
		req.token = cookieToken
	}
	next()
}

module.exports = simpleAuth
