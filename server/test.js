const request = require('request')

request.get('https://www.baidu.com', (err, res, body) => {
  if (err) {
    console.log('err', err)
    return
  }
  console.log('body', body);
})
