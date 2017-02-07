const { json, send } = require('micro')
const cors = require('micro-cors')()
const marked = require('marked')

module.exports = cors(async function (request, response) {
  try {
    const { markdown } = await json(request)

    if (markdown === undefined) {
      return send(response, 412, { error: 'no markdown data provided' })
    }

    send(response, 200, marked(markdown, { sanitize: true }))
  } catch (e) {
    return send(response, 400, { error: 'no post data provided' })
  }
})
