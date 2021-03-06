const request = require("request");
const { JSDOM } = require("jsdom");
const urls = [
  "http://dianying.im/search-${title}-------------/", // 电影先生
  "https://www.xiaoysw.com/vodsearch/-------------/?wd=${title}", // 小小影视
];

const getHTML = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(body);
    });
  });
};

const getActionList = (dom) => {
  const list = [];
  const parentClass = ".module"; // 父元素
  const itemClass = ".module-search-item"; // 影片的每一项
  const imageClass = "img.lazyload"; // 封面
  const titleClass = ".video-info-header h3 a"; // 标题
  const numberClass = ".video-serial"; // 集数
  const itemList = dom.window.document
    .querySelector(parentClass)
    .querySelectorAll(itemClass);
  for (let index = 0; index < itemList.length; index++) {
    const element = itemList[index];
    try {
      const image = element.querySelector(imageClass).getAttribute("data-src");
      const title = element.querySelector(titleClass).innerHTML;
      const numberStr = element.querySelector(numberClass).innerHTML;
      const number = dealNumber(numberStr);
      list.push({
        title,
        image,
        number,
      });
    } catch (error) {
      console.log("element", element.innerHTML);
      continue;
    }
  }
  return list;
};

const dealNumber = (numberStr) => {
  const reg = /\d+/;
  try {
    return Number(numberStr.match(reg)[0]);
  } catch (error) {
    return 0;
  }
};
/**
 * 搜索电影
 * @param {string} title 电影标题
 * @param {number} urlIndex 搜索源
 */
const search = (title, urlIndex = 0) => {
  return new Promise((resolve) => {
    const url = urls[urlIndex].replace("${title}", encodeURIComponent(title));
    getHTML(url).then((html) => {
      const dom = new JSDOM(html);
      const actionList = getActionList(dom);
      resolve(actionList);
    });
  });
};

module.exports = {
  search
}
