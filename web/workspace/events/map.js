const _ = require('lodash')

const slugify = require('slugify')
slugify.extend({':': ' '})

const Event = function (req, res, data, callback) {
  // Add key-value translations to the page
  if (data.hasResults('organisations')) {
    let slugged = data.organisations.results.map(o => {
      o.slug = slugify(o.title, { lower: true })
      return o
    })

    data.organisations.results = slugged

    data.organisationsGrouped = _(slugged)
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
