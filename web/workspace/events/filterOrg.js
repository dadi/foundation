const slugify = require('slugify')
slugify.extend({':': ' '})

const Event = function (req, res, data, callback) {
  let parts = req.url.split('/').filter(Boolean)
  let filter = {}

  parts.forEach((part, index) => {
    if (part === 'd') {
      filter['democracyFocus'] = {
        '$in': getIdsFromTokens(data.orgDemocracy.results, parts[index + 1])
      }
    }

    if (part === 'f') {
      filter['focus'] = {
        '$in': getIdsFromTokens(data.orgFocus.results, parts[index + 1])
      }
    }

    if (part === 's') {
      filter['structure'] = {
        '$in': getIdsFromTokens(data.orgStructure.results, parts[index + 1])
      }
    }

    if (part === 't') {
      filter['techFocus'] = {
        '$in': getIdsFromTokens(data.orgTech.results, parts[index + 1])
      }
    }

    if (part === 'o') {
      filter['organisationType'] = {
        '$in': getIdsFromTokens(data.orgType.results, parts[index + 1])
      }
    }    
  })

  if (data.params.org) {
    filter = { 'title': slugify(data.params.org, { lower: true }) }
  }

  console.log(filter)

  return callback(null, filter)
}

function getIdsFromTokens (dataSource, tokens) {
  return tokens.split('+').map(token => {
    return dataSource.find(item => item.name === token)._id
  })
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}