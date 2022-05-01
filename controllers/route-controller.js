class RenderPage {
	async main(req, res) {
		const user = req.user
		
		res.render('index', {
			title: 'Чат',
			username: user.name,
			avatar: req.avatar,
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
