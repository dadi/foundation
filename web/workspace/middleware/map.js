const Middleware = function (app) {
  app.use('/api/map', (req, res, next) => {
    if (req.method.toLowerCase() !== 'post') {
      return next()
    }

    console.log(req.body.map)

    return res.end('hi')
  })
}

module.exports = function (app) {
  return new Middleware(app)
}

module.exports.Middleware = Middleware
