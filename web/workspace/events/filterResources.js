const Event = function (req, res, data, callback) {
  let categories = req.body.category
  let allIds = []
  let filter = {}

  for (let field in categories) {
    let ids = Object.keys(categories[field])

    // All active filters
    ids.map(i => allIds.push(i))

    filter[field] = {
      '$in': ids
    }
  }

  // Push all active filters to page to control checkboxes
  data.categorySelected = allIds

  return callback(null, filter)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
