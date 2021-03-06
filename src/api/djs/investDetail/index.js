import axios from '@/assets/js/requestDJS'
import Qs from 'qs'

// 出借详情
export function getInvestDetail(data) {
  return axios({
    url: '/InvestCountProjectMsg',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '3.0'
    }
  })
}

//债权列表
export function getClaimList(data) {
  return axios({
    url: '/BondProject',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 获取出借记录
export function investUserCountMsg(data) {
  return axios({
    url: '/InvestUserCountMsg',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 获取个人账户信息
export function getPersonalAccount(data) {
  return axios({
    url: '/PersonalAccount',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 预期收益计算
export function expectedIncome(data) {
  return axios({
    url: 'ExpectedIncome',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 券包最优搭配
export function couponPackageApi(data) {
  return axios({
    url: 'CouponPackage',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 查询用户可用红包
export function availableRedPacketApi(data) {
  return axios({
    url: 'AvailableRedPacket',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 查询用户可用加息券
export function availableCouponApi(data) {
  return axios({
    url: 'AvailableCoupon',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 用户投资
export function investApi(data) {
  return axios({
    url: 'InvestProject',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 到期自动复投
export function expireRepeatApi(data) {
  return axios({
    url: 'ExpireRepeat',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 可用红包数量
export function getRedPacketNumApi(data) {
  return axios({
    url: 'AvailableRedPacketCount',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 可用加息券数量
export function getCouponNumApi(data) {
  return axios({
    url: 'AvailableCouponCount',
    method: 'post',
    data: Qs.stringify(data)
  })
}
