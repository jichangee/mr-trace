const { JSDOM } = require('jsdom')

const dom = new JSDOM({
  url: "http://dianying.im/",
  contentType: "text/html",
  includeNodeLocations: true
})

console.log(dom.window.document.body.innerHTML)