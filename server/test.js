const request = require('request')

// request.get('https://www.baidu.com', (err, res, body) => {
//   if (err) {
//     console.log('err', err)
//     return
//   }
//   console.log('body', body);
// })

request.get('https://sctapi.ftqq.com/SCT18829Twar7gK7U0jMefYqIKPfBtwbQ.send?title=' + encodeURIComponent('外星剧名'))