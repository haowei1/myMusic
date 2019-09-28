/*
import {commonParams, options} from '../../../config'
import axios from 'axios'

export let getLRC = function(musicId) {
  const url = '/api/getLRC'

  const data = Object.assign({}, commonParams, {
    nobase64: 1,
    musicid: musicId,
    g_tk: 5381,
    loginUin: 2012313298,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
*/
