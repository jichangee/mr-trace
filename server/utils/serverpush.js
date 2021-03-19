/**
 * Server酱推送
 */
const https = require('https')

const sendByServer = (title) => {
  return new Promise((resolve) => {
    https.get('https://sctapi.ftqq.com/SCT18829Twar7gK7U0jMefYqIKPfBtwbQ.send?title=' + encodeURIComponent(title), function () {
      resolve()
    })
  })
}

module.exports = sendByServer