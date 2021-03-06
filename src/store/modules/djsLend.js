import Cookies from 'js-cookie'
const djsLend = {
  state: {
    djsLendAmount: Cookies.get('djsLendAmount') || '',
    djsLendCoupon: Cookies.getJSON('djsLendCoupon') || null,
    djsLendRedPacket: Cookies.getJSON('djsLendRedPacket') || null,
    djsChooseCouponFlag: Cookies.get('djsCouponFlag') || true,
    djsChooseRedPacketFlag: Cookies.get('djsRedPacketFlag') || true
  },
  mutations: {
    CHOOSE_DJS_COUPON: (state, coupon) => {
      state.djsLendCoupon = coupon
      Cookies.set('djsLendCoupon', coupon)
    },
    CHOOSE_DJS_REDPACKET: (state, redPacket) => {
      state.djsLendRedPacket = redPacket
      Cookies.set('djsLendRedPacket', redPacket)
    },
    CLEAN_DJS_COUPON: state => {
      state.djsLendCoupon = null
      Cookies.remove('djsLendCoupon')
    },
    CLEAN_DJS_REDPACKET: state => {
      state.djsLendRedPacket = null
      Cookies.remove('djsLendRedPacket')
    },
    SET_DJS_CHOOSE_COUPON_FLAG: (state, value) => {
      state.djsChooseCouponFlag = value
      Cookies.set('djsCouponFlag', value)
    },
    SET_DJS_CHOOSE_REDPACKET_FLAG: (state, value) => {
      state.djsChooseRedPacketFlag = value
      Cookies.set('djsRedPacketFlag', value)
    },
    CLEAN_DJS_LEND_DATA: state => {
      state.djsLendAmount = null
      state.djsLendCoupon = null
      state.djsLendRedPacket = null
      Cookies.remove('djsLendAmount')
      Cookies.remove('djsLendCoupon')
      Cookies.remove('djsLendRedPacket')
    }
  }
}

export default djsLend
