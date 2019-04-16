import request from '@/assets/js/requestDJS'
import qs from 'qs'

//交易记录
export function getUserTransaction(data) {
  return request({
    url: 'TrasactionList',
    method: 'post',
    data: qs.stringify(data)
  })
}
