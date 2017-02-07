const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const request = require('request-promise')
const marked = require('marked')

test.beforeEach(async (t) => {
  const markdownService = require('../index.js')
  const service = micro(markdownService)
  t.context.url = await listen(service)
})

test('returns html', async (t) => {
  const body = await request({
    method: 'POST',
    url: t.context.url,
    body: {
      markdown: '# Hello World'
    },
    json: true
  })
  t.deepEqual(body, marked('# Hello World'))
})
