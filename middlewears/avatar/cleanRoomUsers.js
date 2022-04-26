const room = require('../../schema/Room')
const jwt = require('jsonwebtoken')

function cleanRoomUsers(req, res, next) {
	if (!req.cookies.access) return res.redirect('/login')
	const verifiedUser = jwt.verify(req.cookies.access, process.env.SECRET_TOKEN)
   checkRoomUsers(room.users, verifiedUser)
   room.addUser(JSON.stringify(verifiedUser))
   req.user = verifiedUser
	next()
}

function checkRoomUsers(usersSet, verifiedUser) {
	usersSet.forEach((user) => {
		if (user.includes(verifiedUser.id)) {
         room.deleteUser(user)
      } 
	})
}

module.exports = cleanRoomUsers
