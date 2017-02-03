const { json, send } = require('micro')
const marked = require('marked')

module.exports = async function (request, response) {
  let data = null

  try {
    data = await json(request)
  } catch (e) {
    return send(response, 400, { error: 'no post data provided' })
  }

  if (data.markdown == undefined) {
    return send(response, 412, { error: 'no markdawn data provided' })
  }

  send(response, 200, marked(data.markdown, { sanitize: true }) )
}
