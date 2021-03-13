const { getNumberByMovieIdAndTitle } = require('../dom')
const { query } = require('../mysql')
const sendByServer = require('../utils/serverpush')

const checkUpdate = async () => {
  console.log('执行订阅定时任务中...')
  const searchSql = 'SELECT * FROM subscribe_list'
  
  try {
    const dbRes = await query(searchSql)
    dbRes.forEach(async (item) => {
      getNumberByMovieIdAndTitle(item.movie_id, item.title)
        .then((res) => {
          const lastNumber = res.data
          if (Number(lastNumber) > Number(item.number)) {
            sendByServer(`${item.title}更新到第${lastNumber}集了`)
            const updateSql = `UPDATE subscribe_list SET number=${lastNumber} WHERE movie_id=${item.movie_id}`
            query(updateSql)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
        .finally(() => {
          console.log('订阅定时任务执行完成')
        })
    })
  } catch (error) {
    console.log('订阅定时任务异常:', error)
  }
}

const startSubscribeTask = () => {
  console.log('订阅定时任务开启')
  checkUpdate()
  setInterval(checkUpdate, 60 * 60 * 1000)
}

module.exports = startSubscribeTask
