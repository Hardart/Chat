const { Users } = require('../schema/mongoSchemas')
const jwt = require('jsonwebtoken')
const room = require('../schema/Room')
const fetch = require('node-fetch')

class PageApi {
	async registration(req, res) {
		const { email, name, password } = req.body
		let chatID = await Users.count()
		const user = new Users({
			email: email,
			name: name,
			password: password,
			chatId: `#${chatID + 1}`,
		})
		await user.save()
		res.redirect('/login')
	}

	async login(req, res) {
		const { mail, password } = req.body
		const token = jwt.sign({ email: mail, password: password }, process.env.SECRET_TOKEN)
		const auth = await fetch(process.env.LOCAL_REDIRECT_URL, {
			method: 'get',
			headers: {
				Authorization: token,
			},
		}).then((res) => {
			return res.json()
		})
		switch (auth.callback) {
			case 'ok':
				res.cookie('access', auth.token, { httpOnly: true, expires: new Date(Date.now() + 86400e3) })
				res.redirect('/')
				break
			case 'error':
				res.redirect('/login')
				break
			case 'noUser':
				res.render('login', {
					title: 'Авторизация',
					user: false,
					mess: `Логин или пароль не верны`,
				})
				break
		}
	}

	async logout(req, res) {
		if (req.cookies.access) {
			const user = jwt.verify(req.cookies.access, process.env.SECRET_TOKEN)
			room.users.delete(`${user.id}=${user.name}`)
		}
		res.clearCookie('access')
		res.send({ callback: 'ok' })
	}
}

module.exports = new PageApi()
