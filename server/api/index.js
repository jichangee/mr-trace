const { search } = require('../dom')
const dayjs = require('dayjs')
const { query } = require('../mysql')

/**
 * 搜索影片
 * @param {*} ctx
 */
const httpSearch = async (ctx) => {
  const { q, f } = ctx.query
  let code = 200
  let data = null
  let msg = ''
  if (q === '' || q === undefined || q === null) {
    msg = '请输入搜索关键词'
  } else {
    try {
      // 是否命中缓存
      let dbRes = await query(
        `SELECT * FROM search_list WHERE q='${q}' AND now() < SUBDATE(update_time, interval -1 hour)`
      )
      // f === true：刷新缓存
      if (dbRes.length && f !== 'true') {
        data = JSON.parse(dbRes[0].data)
      } else {
        data = await search(q)
        dbRes = await query(`SELECT id FROM search_list WHERE q='${q}'`)
        let id = ''
        if (dbRes.length) id = dbRes[0].id

        const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        await query(
          `REPLACE INTO search_list (${
            id ? 'id,' : ''
          }q,data,update_time) VALUES (${
            id ? id + ',' : ''
          }'${q}','${JSON.stringify(data)}','${updateTime}')`
        )

        const replaceMovieListSQL = getReplaceMovieListSQL(data)
        query(replaceMovieListSQL)
      }
      msg = '搜索成功'
    } catch (error) {
      ctx.status = 500
      code = 500
      console.log('error', error)
      msg = JSON.stringify(error)
    }
  }
  ctx.body = {
    code,
    msg,
    data,
  }
}
function getReplaceMovieListSQL(list) {
  let sql = 'REPLACE INTO movie_list (title,image,number,type,movie_id) VALUES '
  let values = []
  list.forEach((item) => {
    values.push(
      `('${item.title}','${item.image}',${item.number},'${item.type}',${item.movieId})`
    )
  })
  sql += values.join(',')
  return sql
}

const httpSubscribe = async (ctx) => {
  const { movieId, title, email, number, id } = ctx.request.body
  let code = 200
  let data = true
  let msg = '订阅成功'
  if (!movieId) {
    ctx.status = 400
    code = 400
    data = false
    msg = 'movieId不能为空'
  } else if (!title) {
    ctx.status = 400
    code = 400
    data = false
    msg = 'title不能为空'
  } else if (!email) {
    ctx.status = 400
    code = 400
    data = false
    msg = 'email不能为空'
  } else if (!number) {
    ctx.status = 400
    code = 400
    data = false
    msg = 'number不能为空'
  } else {
    try {
      const createTime = id ? '' : dayjs().format('YYYY-MM-DD HH:mm:ss')
      let sql = `REPLACE INTO subscribe_list (${
        id ? 'id,' : ''
      }movie_id, title, email, number${
        createTime ? ', create_time' : ''
      }) VALUES (${id ? id + ',' : ''}${movieId},'${title}','${email}',${number}${
        createTime ? ",'" + createTime + "'" : ''
      })`
  
      await query(sql)
    } catch (error) {
      ctx.status = 500
      code = 500
      data = false
      msg = `订阅失败，${JSON.stringify(error)}`
    }
  }
  
  ctx.body = {
    code,
    msg,
    data
  }
}
/**
 * 取消订阅
 */
const httpunSubscribe = async (ctx) => {
  const id = ctx.request.body.id
  if (!id) {
    ctx.status = 400
    ctx.body.code = 400
    ctx.body.data = false
    ctx.body.msg = 'id不能为空'
  } else {
    ctx.body.code = 200
    try {
      const dbRes = await query(`DELETE FROM subscribe_list WHERE id=${id}`)
      if (dbRes.length) {
        ctx.body.msg = '取消订阅成功'
        ctx.body.data = true
      } else {
        ctx.body.msg = '取消订阅失败，未找到订阅信息'
        ctx.body.data = false
      }
    } catch (error) {
      ctx.body.code = 500
      ctx.status = 500
    }
  }
  
}

const httpSubscribeList = async (ctx) => {
  let code = 200
  let msg = ''
  let data = []
  try {
    const dbRes = await query('SELECT * FROM subscribe_list')
    msg = '获取成功'
    data = dbRes
  } catch (error) {
    ctx.status = 500
    code = 500
    msg = '获取失败，' + JSON.stringify(err)
  }
  
  ctx.body = {
    code,
    msg,
    data
  }
}

module.exports = {
  httpSearch,
  httpSubscribe,
  httpSubscribeList,
  httpunSubscribe
}
