const { getNumberByMovieIdAndTitle } = require('../dom')
const { query } = require('../mysql')
const sendByServer = require('../utils/serverpush')
const { sleep } = require('../utils')

const checkUpdate = async () => {
  console.log('执行订阅定时任务中...')
  const searchSql = 'SELECT * FROM subscribe_list'
  
  try {
    const dbRes = await query(searchSql)
    dbRes.forEach(async (item) => {
      try {
        const res = await getNumberByMovieIdAndTitle(item.movie_id, item.title)
        console.log('res', res)
        const lastNumber = res.data
        if (Number(lastNumber) > Number(item.number)) {
          await sendByServer(`${item.title}更新到第${lastNumber}集了`)
          const updateSql = `UPDATE subscribe_list SET number=${lastNumber} WHERE movie_id=${item.movie_id}`
          await query(updateSql)
        }
        await sleep(1000)
      } catch (error) {
        console.log('getNumberByMovieIdAndTitle err', error)
      }
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
