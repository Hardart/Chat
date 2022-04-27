const { promises: Fs } = require('fs')
const jwt = require('jsonwebtoken')
const room = require('../schema/Room')
const fetch = require('node-fetch')

class PagesApi {
   async chat(req, res) {
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

   async login(req, res, next) {
      if (req.user) return res.send({ callback: 'ok', token: req.token })
      if (req.cookies.access) return res.redirect('/')
   
      res.render('login', {
         title: 'Авторизация',
         user: true,
      })
   }

   async loginPost (req, res) {
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

module.exports = new PagesApi()
 