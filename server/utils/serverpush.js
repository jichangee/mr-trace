/**
 * Server酱推送
 */
const request = require('request')

const sendByServer = (title) => {
  return new Promise((resolve) => {
    request.get('https://sctapi.ftqq.com/SCT18829Twar7gK7U0jMefYqIKPfBtwbQ.send?title=' + encodeURIComponent(title), function () {
      resolve()
    })
  })
}

module.exports = sendByServer