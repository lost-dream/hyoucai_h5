import request from '@/assets/js/requestHYC'
import qs from 'qs'

//公司简介/动态列表数据
export function getList(data) {
  return request({
    url: 'ZxdtMtbdMsg',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 首页标的列表
export function getQualityList(data) {
  return request({
    url: '/homePage/projectList',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}
