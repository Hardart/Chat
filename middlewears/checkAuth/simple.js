const { Users } = require('../../schema/mongoSchemas')
const jwt = require('jsonwebtoken')

async function simpleAuth(req, res, next) {
	if (req.headers.authorization) {
		const verifiedUser = jwt.verify(req.headers.authorization, process.env.SECRET_TOKEN)
		const user = await Users.findOne({ email: verifiedUser.email, password: verifiedUser.password })
		if (user) {
			const cookieToken = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET_TOKEN)
			return res.send({ callback: 'ok', token: cookieToken })
		}
		return res.send({ callback: 'error' })
	}
	next()
}

module.exports = simpleAuth
