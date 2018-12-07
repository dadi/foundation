let static = {}

const Event = function (req, res, data, callback) {
  // Add key-value translations to the page
  if (data.hasResults('static')) {
    data.static.results.map(i => static[i.key] = i.value)
    data.static = static
  }
    
  // Fin
  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}