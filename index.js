const { json, send } = require('micro')
const cors = require('micro-cors')()
const compress = require('micro-compress')
const marked = require('marked')

const middleware = [
  cors, compress
]

const applyMiddleware = (service, middleware) => {
  return middleware.reduce((fn, nextMiddleware) => {
    return nextMiddleware(fn)
  }, service)
}

const markdownService = async function (request, response) {
  try {
    const { markdown } = await json(request)

    if (markdown === undefined) {
      return send(response, 412, { error: 'no markdown data provided' })
    }

    send(response, 200, marked(markdown, { sanitize: true }))
  } catch (e) {
    return send(response, 400, { error: 'no post data provided' })
  }
}

module.exports = applyMiddleware(markdownService, middleware)
