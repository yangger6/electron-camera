const Koa = require('koa')
const fs = require('fs')
const router = require('koa-router')()
// const multer = require('koa-multer')
const cors = require('@koa/cors')
const formidable = require("formidable")
const app = new Koa();
const fileKey = 'myPhoto'

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
function getFolder (folderName) {
  return new Promise((resolve , reject) => {
    fs.exists(`./uploads/${folderName}`, exists => {
      if (exists) {
        console.log('文件夹存在')
        resolve(folderName)
      } else {
        console.log('文件夹不存在')
        fs.mkdir(`./uploads/${folderName}`,function(err){
          if (err) {
            console.error(err)
            reject(err)
          }
          resolve(folderName)
          console.log('创建目录成功')
        });
      }
    })
  })
}
function savePhotos(dataBuffer, path, num) {
  return new Promise((resolve , reject) => {
    path = path ? `/${path}` : ''
    num = num ? `-${num}` : ''
    fs.writeFile(`./uploads${path}/${String(Date.now())}${num}.png`, dataBuffer, err => {
      if (err) {
        reject(err)
      }
      resolve('success')
    })
  })
}
app.use(cors());
app.use(router.routes()).use(router.allowedMethods())
router.post('/uploads', async (ctx, next) => {
  try {
    let formData = await formParse(ctx.req)
    let imgData = formData[fileKey].replace(/^data:image\/\w+;base64,/, '')
    let dataBuffer = new Buffer(imgData, 'base64');
    let res = await savePhotos(dataBuffer)
    ctx.body = res
    await next()
  } catch (e) {
    console.log('error by formParse')
  }
})
router.post('/brusts', async (ctx, next) => {
  try {
    let formData = await formParse(ctx.req)
    let folderName = await getFolder(formData['key'])
    let photoNum = formData['num']
    let imgData = formData[fileKey].replace(/^data:image\/\w+;base64,/, '')
    let dataBuffer = new Buffer(imgData, 'base64');
    let res = await savePhotos(dataBuffer, folderName, photoNum)
    ctx.body = res
    await next()
  } catch (e) {
    console.log(e)
  }
})
module.exports = function (port) {
  app.listen(port)
}