const _ = require('lodash')

const Event = function (req, res, data, callback) {
  // Add key-value translations to the page
  if (data.hasResults('organisations')) {
    data.organisationsGrouped = _(data.organisations.results)
      .groupBy(o => {
        let firstChar = o.title.charAt(0).toUpperCase()
        if (isNaN(firstChar)) {
          return firstChar
        } else {
          return '#'
        }
      })
      .map((orgs, letter) => ({ letter, orgs }))
      .value()
  }
    
  // Fin
  callback()
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}