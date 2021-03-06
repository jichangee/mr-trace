const { search } = require("../dom");
const dayjs = require("dayjs");
const { query } = require("../mysql");

const cacheTime = 1000 * 60 * 60; // 1小时
const cacheSearchList = {};
const cacheSubscribeList = [];

/**
 * 搜索影片
 * @param {*} ctx
 */
const httpSearch = async (ctx) => {
  const { q } = ctx.query;
  let code = 200;
  let data = null;
  let msg = "";
  if (q === "" || q === undefined || q === null) {
    msg = "请输入搜索关键词";
  } else if (
    cacheSearchList[q] &&
    Date.now() - cacheSearchList[q].time < cacheTime
  ) {
    data = cacheSearchList[q].data;
    msg = "搜索成功";
  } else {
    try {
      let dbRes = await query(`SELECT * FROM search_list WHERE q='${q}' AND now() < SUBDATE(update_time, interval -1 hour)`)
      if (dbRes.length) {
        data = JSON.parse(dbRes[0].data)
      } else {
        data = await search(q);
        dbRes = await query(`SELECT id FROM search_list WHERE q='${q}'`)
        let id = ''
        if (dbRes.length) id = dbRes[0].id

        const updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
        await query(
          `INSERT INTO search_list (${id ? 'id,' : ''}q,data,update_time) VALUES (${id ? id + ',' : ''}'${q}','${JSON.stringify(
            data
          )}','${updateTime}') ON DUPLICATE KEY UPDATE data='${JSON.stringify(data)}', update_time='${updateTime}'`
        );
      }
      msg = "搜索成功";
    } catch (error) {
      code = 500;
      console.log('error', error)
      msg = JSON.stringify(error);
    }
  }
  ctx.body = {
    code,
    msg,
    data,
  };
};

const httpSubscribe = (ctx) => {
  const { title, email, number } = ctx.query;
  let code = 200;
  let data = null;
  let msg = "";
};

module.exports = {
  httpSearch,
};
