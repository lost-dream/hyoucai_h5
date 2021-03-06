import request from '@/assets/js/requestHYC'
import qs from 'qs'

//交易记录
export function getUserTransaction(data) {
  return request({
    url: 'userTransaction/record',
    method: 'post',
    data: qs.stringify(data)
  })
}
