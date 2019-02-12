const parse = require('csv-parse')
const fs = require('fs')
const API = require('@dadi/api-wrapper')

let env = process.env.NODE_ENV
let webConfig = require(`../web/config/config.${env}.json`)

let references = {
  orgStructure: [],
  orgFocus: [],
  democracyFocus: [],
  organisationType: [],
  techFocus: []
}

let output = []

fs.readFile('./data.csv', (_err, body) => {
  parse(body, {
    columns: true
  }, (_err, records) => {
    records.forEach(record => {
      Object.keys(record).forEach(key => {
        let title
        if (key.substring(0, 3) === 'OT:') {
          title = key.substring(3).trim()
          if (!references.organisationType.find(item => item.title === title)) {
            references.organisationType.push({ title: title })
          }
        }

        if (key.substring(0, 3) === 'DF:') {
          title = key.substring(3).trim()
          if (!references.democracyFocus.find(item => item.title === title)) {
            references.democracyFocus.push({ title: title })
          }
        }

        if (key.substring(0, 3) === 'TF:') {
          title = key.substring(3).trim()
          if (!references.techFocus.find(item => item.title === title)) {
            references.techFocus.push({ title: title })
          }
        }

        if (key === 'structure') {
          title = record[key].trim()
          if (!references.orgStructure.find(item => item.title === title)) {
            references.orgStructure.push({ title: title })
          }
        }

        if (key === 'focus') {
          title = record[key].trim()
          if (!references.orgFocus.find(item => item.title === title)) {
            references.orgFocus.push({ title: title })
          }
        }
      })
    })

    apiInsert('organisationType', references.organisationType).then(() => {
      apiInsert('democracyFocus', references.democracyFocus).then(() => {
        apiInsert('techFocus', references.techFocus).then(() => {
          apiInsert('orgStructure', references.orgStructure).then(() => {
            apiInsert('orgFocus', references.orgFocus).then(() => {
              console.log('DONE INSERTING REFERENCES')

              records.forEach(record => {
                Object.keys(record).forEach(key => {
                  let title
                  if (key.substring(0, 3) === 'OT:') {
                    if (record[key] === 'TRUE') {
                      title = key.substring(3)
                      let ref = references.organisationType.find(item => item.title === title.trim())
                      record.organisationType = record.organisationType || []
                      record.organisationType.push(ref.id)
                    }

                    delete record[key]
                  }

                  if (key.substring(0, 3) === 'DF:') {
                    if (record[key] === 'TRUE') {
                      title = key.substring(3)
                      let ref = references.democracyFocus.find(item => item.title === title.trim())
                      record.democracyFocus = record.democracyFocus || []
                      record.democracyFocus.push(ref.id)
                    }

                    delete record[key]
                  }

                  if (key.substring(0, 3) === 'TF:') {
                    if (record[key] === 'TRUE') {
                      title = key.substring(3)
                      let ref = references.techFocus.find(item => item.title === title.trim())
                      record.techFocus = record.techFocus || []
                      record.techFocus.push(ref.id)
                    }

                    delete record[key]
                  }

                  if (key === 'structure') {
                    let ref = references.orgStructure.find(item => item.title === record[key].trim())
                    record.structure = ref.id
                  }

                  if (key === 'focus') {
                    let ref = references.orgFocus.find(item => item.title === record[key].trim())
                    record.focus = ref.id
                  }
                })

                output.push(record)
              })

              apiInsert('organisations', output).then(() => {
                console.log('\nDONE.')
              }).catch(err => {
                console.log('Error main', err)
              })
            }).catch(err => {
              console.log('Error 1', err)
            })
          }).catch(err => {
            console.log('Error 2', err)
          })
        }).catch(err => {
          console.log('Error 3', err)
        })
      }).catch(err => {
        console.log('Error 4', err)
      })
    }).catch(err => {
      console.log('Error 5', err)
    })
  })
})

function apiInsert (collection, documents) {
  return new Promise((resolve, reject) => {
    let api = new API({
      uri: `http://${webConfig.api.main.host}`,
      port: webConfig.api.main.port,
      credentials: {
        clientId: webConfig.api.main.auth.clientId,
        secret: webConfig.api.main.auth.secret
      },
      version: '1.0',
      database: 'foundation'
    })

    documents = documents.map(document => {
      if (document.title !== '') {
        return document
      }
    }).filter(Boolean)

    api
      .in(collection)
      .create(documents)
      .then(response => {
        if (references[collection]) {
          response.results.forEach(result => {
            let mappedItem = references[collection].find(item => item.title === result.title)
            mappedItem.id = result._id
          })
        }

        return resolve()
      })
      .catch(err => {
        return reject(err)
      })
  })
}
