const Koa = require('koa')
const fs = require('fs')
const router = require('koa-router')()
// const multer = require('koa-multer')
const cors = require('@koa/cors')
const formidable = require("formidable")
const app = new Koa();
const fileKey = 'myPhoto'

app.use(cors());
app.use(router.routes()).use(router.allowedMethods())
router.post('/uploads', async (ctx, next) => {
  function formParse (req) {
    return new Promise((resolve , reject) => {
      let form = new formidable.IncomingForm();
      let fileList = {}
      form.parse(req)
        .on("error", err => reject(err))
        .on('field', (name, value) => {
          fileList[name] = value
        })
        .on('end', () => resolve(fileList))
    })
  }
  try {
    let base64Data = await formParse(ctx.req)
    let imgData = base64Data[fileKey].replace(/^data:image\/\w+;base64,/, '')
    let dataBuffer = new Buffer(imgData, 'base64');
    await fs.writeFile(`./uploads/${String(Date.now())}.png`, dataBuffer, err => {
      if (err) {
        console.log(err)
      }
    })
  } catch (e) {
    console.log('error by formParse')
  }
  ctx.body = 'success'
})
module.exports = function (port) {
  app.listen(port)
}