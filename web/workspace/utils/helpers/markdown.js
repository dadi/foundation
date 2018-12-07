const dust = require('dustjs-linkedin')
const marked = require('marked')

/*
* Returns the markdown content formatted as HTML
*/
dust.helpers.markdown = function(chunk, context, bodies, params) {
  return chunk.capture(bodies.block, context, function(string, chunk) {
    chunk.end(marked(string))
  })
}