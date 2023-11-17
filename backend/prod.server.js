const express = require('express')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const csrf = require('xsrf')
const registerRouter = require('./router')
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors')

const port = process.env.PORT || 9002

const app = express()
// 创建代理中间件
const proxyMiddleware = createProxyMiddleware({
  target: 'http://ustbhuangyi.com',
  changeOrigin: true, // 修改请求头中的 Origin 为目标服务器的 URL
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:9002'; // 添加允许的来源
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'; // 添加允许的请求方法
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type'; // 添加允许的请求头
  }
});
// 将代理中间件应用到指定的路径
app.use('/music-next/api', proxyMiddleware);
// 配置cros跨域请求中间件
app.use(cors())

const csrfProtection = csrf({
  cookie: true,
  ignoreMethods: ['HEAD', 'OPTIONS'],
  checkPathReg: /^\/api/
})
app.use(cookieParser())
app.use(csrfProtection)

app.get('/', function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  return next()
})



app.use(compression())

app.use(express.static('./dist'))

app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next()
  }

  // handle CSRF token errors here
  res.status(403)
  res.send('<p>接口已经被我用 CSRF 保护了，请参考课程用自己的服务器代理接口</p>')
})
registerRouter(app)

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
