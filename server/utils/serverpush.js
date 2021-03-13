/**
 * Server酱推送
 */
const https = require('https')

const sendByServer = (title) => {
  https.get('https://sctapi.ftqq.com/SCT18829Twar7gK7U0jMefYqIKPfBtwbQ.send?title=' + title)
}

module.exports = sendByServer