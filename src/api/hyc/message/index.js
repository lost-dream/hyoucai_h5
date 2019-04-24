import request from '@/assets/js/requestHYC'
import qs from 'qs'

//加息券未读消息中心接口
function getSiteMessage(data) {
  return request({
    url: '/siteMessage/query',
    method: 'post',
    data: qs.stringify(data)
  })
}

export default {
  getSiteMessage // 站内信查询
}
