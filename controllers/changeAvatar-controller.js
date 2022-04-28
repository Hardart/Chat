const imageInfo = require('image-size')

class ChangeAvatarApi {
   upload(req, res) {
      if (req.file) {
         let file = req.file
         let result = imageInfo('./' + file.path)
   
         file.width = result.width
         file.height = result.height
         return res.json(file)
      }
      res.send({ status: 'error' })
   }

   resize(req, res) {
      if (req.resize) return res.send({ status: 'ok', path: req.resize.path })
      res.send({ status: 'error' })
   }

   pressCancelBtn (req, res) {
      if (req.delete) return res.send({ status: 'ok' })
      res.send({ status: 'error' })
   }
}

module.exports = new ChangeAvatarApi()
