const Event = function (req, res, data, callback) {
  let map = req.body.map
  let allIds = []
  let filter = {}

  for (let field in map) {
    let ids = Object.keys(map[field])

    // All active filters
    ids.map(i => allIds.push(i))

    filter[field] = {
      '$in': ids
    }
  }

  // Push all active filters to page to control checkboxes
  data.mapSelected = allIds

  return callback(null, filter)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}