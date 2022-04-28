const { promises: Fs } = require('fs')

class RenderPage {
	async main(req, res) {
		const user = req.user
		let avatar
		try {
			await Fs.access(`./public${user.avatar}`)
			avatar = user.avatar
		} catch {
			avatar = process.env.AVATAR_PLACEHOLDER
		}
		res.render('index', {
			title: 'Чат',
			username: user.name,
			avatar: avatar,
			chatId: user.chatId,
		})
	}

	async login(req, res) {
		if (req.user) return res.send({ callback: 'ok', token: req.token })
		if (req.cookies.access) return res.redirect('/')

		res.render('login', {
			title: 'Авторизация',
			user: true,
		})
	}

	async registration(req, res) {
		res.render('registration', {
			title: 'Авторизация',
		})
	}

   unknown(req, res) {
      res.render('404', {
         title: 'Страница 404',
      })
   }
}

module.exports = new RenderPage()
