import axios from 'axios'
//获取歌曲列表的数据
//由于这里使用了代理请求，所以前端的请求要改成ajax请求
export function getDisList() {
  const url = '/api/getDiscList'
  const data = {
    // songmid: "237224580",
    // tpl:'yqq_song_detail',
    // format:'json',
    // callback:'getOneSongInfoCallback',
    // g_tk:'1134533366',
    // jsonpCallback:'getOneSongInfoCallback',
    // loginUin:'0',
    // hostUin:'0',
    // inCharset:'utf8',
    // outCharset:'utf-8',
    // notice:0,
    // platform:'yqq',
    // needNewCode:0

    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'jsonp'
  }
  //使用ajax请求，这里用axios
  return axios.get(url, {
    params: data
  }).then((res) => {
    //  成功返回一个Promise对象
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}
