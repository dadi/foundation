const Event = function (req, res, data, callback) {
  moveItem(data, 'orgType', 'Other')
  moveItem(data, 'orgDemocracy', 'Other')
  moveItem(data, 'orgTech', 'Other')

  // Fin
  callback()
}

function moveItem (data, dataSet, title) {
  if (data.hasResults(dataSet)) {
    let index = data[dataSet].results.findIndex(item => item.title === title)

    if (index) {
      let item = data[dataSet].results.splice(index, 1)

      if (item) {
        data[dataSet].results.push(item[0])
      }
    }
  }
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
