const url = require('url')
const apiVK = require('node-vk-bot-api/lib/api')

function vkAuth(req, res, next) {
	const { query } = url.parse(req.url, true)

	if (query.code) {
		const authUrl = `https://oauth.vk.com/access_token?client_id=${process.env.VK_APP_ID}&client_secret=${process.env.VK_APP_TOKEN}&redirect_uri=${process.env.VK_REDIRECT_URL}&code=${query.code}`

		const response = await fetch(authUrl, {
			method: 'GET',
		}).then((res) => res.json())

		const user = await apiVK('users.get', {
			peer_id: response.user_id,
			access_token: response.access_token,
			fields: 'photo_100',
		}).then((user) => user.response[0])

		const tokenFromVK = jwt.sign({ id: user.id, name: user.first_name, avatar: user.photo_100 }, process.env.SECRET_TOKEN)
		res.cookie('access', tokenFromVK, { httpOnly: true, expires: new Date(Date.now() + 86400e3) })
		return res.redirect('/')
	}
	next()
}

module.exports = { vkAuth }
