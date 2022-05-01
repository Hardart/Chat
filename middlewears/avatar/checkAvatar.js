const { promises: Fs } = require('fs')

function checkAvatar(req, res, next) {
   const user = req.user
	try {
      await Fs.access(`./public${user.avatar}`)
      req.avatar = user.avatar
   } catch {
      req.avatar = process.env.AVATAR_PLACEHOLDER
   }
	next()
}

module.exports = checkAvatar