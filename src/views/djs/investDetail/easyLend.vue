<template>
  <div class="lend-wrapper">
    <BScroll class="lend">
      <section>
        <div class="huge">
          <ul>
            <li>
              <span>{{ investDetail.basicsInvestRate }}</span>
              <span class="pre">%</span>
              <label v-if="investDetail.activityInvestRate && parseFloat(investDetail.activityInvestRate) !== 0">+</label>
              <em class="act" v-if="investDetail.activityInvestRate && parseFloat(investDetail.activityInvestRate) !== 0">{{
                investDetail.activityInvestRate
              }}</em>
              <span class="pre" v-if="investDetail.activityInvestRate && parseFloat(investDetail.activityInvestRate) !== 0">%</span>
            </li>
            <li>
              <h5>{{ investDetail.projectName }}</h5>
              <h6>锁定期{{ investDetail.investMent }}天</h6>
            </li>
          </ul>
          <p>
            <span>剩余可投</span>
            <span v-if="investDetail.surplusAmount / 10000 > 1">{{ (investDetail.surplusAmount / 10000).toFixed(2) }}万</span>
            <span v-else>{{ investDetail.surplusAmount }}元</span>
          </p>
        </div>
        <!-- type === '01' 新手标 && 项目可投金额 > 账户已投金额 -->
        <div class="newbie" v-if="investDetail.type === '01' && investDetail.singleLimit - amountInfo.projectInvestAmount > 0">
          <div class="title">新手<br />特权</div>
          <div class="loading">
            <section
              :style="{ width: (1.7 * (investDetail.singleLimit - amountInfo.projectInvestAmount)) / investDetail.singleLimit + 'rem' }"
            ></section>
          </div>
          <p>
            <span>还可继续投资</span>
            <br />
            <span>{{ (investDetail.singleLimit - amountInfo.projectInvestAmount).toFixed(2) }}元</span>
          </p>
        </div>
        <div class="amount-block">
          <h6>投标金额</h6>
          <section>
            <div>¥</div>
            <input
              type="number"
              :placeholder="investDetail.minInvAmt + '元起投，单笔限额' + investDetail.singleLimit + '元'"
              v-model="amount"
              :disabled="disableAmount"
            />
          </section>
          <p class="err-msg">{{ errMsg }}</p>
          <div class="ctrl">
            <div>
              <p>
                <span class="key"><i class="iconfont icon-ti-shi"></i>可用余额</span>
                <span class="value">{{ amountInfo.banlance }}元</span>
              </p>
              <p>
                <span class="key">预估收益：</span>
                <span class="value">{{ expectedIncome }}</span>
              </p>
            </div>
            <button :class="{ active: lendAllFlag }" @click="lendAll">全部投标</button>
          </div>
        </div>
        <ul class="coupon">
          <li @click="chooseCoupon">
            <span>加息券</span>
            <div>
              <p v-if="!checkedCoupon">{{ couponNum }}张</p>
              <label v-else>{{ checkedCoupon.validDays }}天{{ checkedCoupon.couponRate }}%加息券</label>
              <i class="iconfont icon-rightpage"></i>
            </div>
          </li>
          <li @click="chooseRedPacket">
            <span>红包</span>
            <div>
              <p v-if="!checkedRedPacket">{{ redPacketNum }}张</p>
              <label v-else>{{ checkedRedPacket.redPacketAmount }}元红包</label>
              <i class="iconfont icon-rightpage"></i>
            </div>
          </li>
        </ul>
        <div class="agree">
          <div v-for="(agreement, index) in protocolData" :key="index">
            <input type="checkbox" id="isCheck" :class="{ active: agree }" :checked="agree" v-if="agreement.checkBox" />
            <label for="isCheck" @click="changeStatus" v-if="agreement.isChecked"></label>
            <section>
              <p v-for="(item, index2) in agreement.list" :key="index2">
                <span>{{ item.description1 }}</span>
                <span @click="showAgre(item.showUrl)" class="agreement">{{ item.name }}</span>
                <span>{{ item.description2 }}</span>
              </p>
            </section>
          </div>
        </div>
        <p class="state">本人已清楚了解投标规则及项目风险，并谨此授权依据该投标规则进行投标。</p>
      </section>
    </BScroll>

    <div class="invest-btn">
      <section :class="{ active: canILend && agree }" @click="invest">
        <h6>{{ lendBtnMsg }}</h6>
        <p>{{ lendBtnDetail }}</p>
        <p></p>
      </section>
    </div>

    <!-- 复投弹窗 -->
    <Dialog
      class="auto-lend-dialog"
      :show.sync="autoInvestDialogOptions.show"
      :title="autoInvestDialogOptions.title"
      :onConfirm="confirmAutoInvest"
      :onClose="closeAutoInvest"
    >
      <p v-if="investDetail.doubleBonuCouponEntity">设置自动出借，加{{ investDetail.doubleBonuCouponEntity.dbCouponRate }}%年化，到期复投生效</p>
      <mt-radio align="right" v-model="autoLendType" :options="autoLendTypeRadio"> </mt-radio>
      <p class="agre" @click="$router.push({ name: 'DJSagreement', query: { agreementType: 'zdtz' } })">自动出借服务条款></p>
    </Dialog>

    <!-- 自动出借设置成功弹窗 -->
    <Dialog
      class="auto-lend-sxs-dialog"
      :show.sync="autoLendSuccessDialogOptions.show"
      :title="autoLendSuccessDialogOptions.title"
      :confirmText="autoLendSuccessDialogOptions.confirmText"
      :onConfirm="confirmAutoLendSXS"
    >
      <img src="./images/auto-lend-success.png" alt="" />
      <p>{{ autoLendSuccessDialogOptions.msg }}</p>
    </Dialog>

    <!-- 风险测评弹窗 -->
    <Dialog
      class="risk-test-dialog"
      :show.sync="riskTestDialogOptions.show"
      :title="riskTestDialogOptions.title"
      :confirmText="riskTestDialogOptions.confirmText"
      :onConfirm="confirmRiskText"
    >
      <div>
        <p>{{ riskTestDialogOptions.msg }}</p>
      </div>
    </Dialog>

    <!-- 充值弹窗 -->
    <Confirm :show.sync="chargeDialogOption.show" :confirmText="chargeDialogOption.confirmText" :onConfirm="confirmCharge">
      <p>账户余额不足，请充值！</p>
    </Confirm>

    <!-- 风险测评已过期 -->
    <Dialog :show.sync="riskPastDueDialogOptions.show" confirmText="重新评测" :onConfirm="confirmRiskPastDue">
      <div>
        <p>{{ riskPastDueDialogOptions.msg }}</p>
      </div>
    </Dialog>

    <!-- 授权已过期 -->
    <Dialog :show.sync="authPastDueDialogOptions.show" :onConfirm="confirmAuthPastDue">
      <div>
        <p>{{ authPastDueDialogOptions.msg }}</p>
      </div>
    </Dialog>

    <!-- 其他错误弹窗 -->
    <Dialog :show.sync="investErrDialogOptions.show">
      <div>
        <p>{{ investErrDialogOptions.msg }}</p>
      </div>
    </Dialog>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import Dialog from '@/components/Dialog/Alert'
import Confirm from '@/components/Dialog/Confirm'

import { Toast, Indicator } from 'mint-ui'

import { getProtocaol } from '@/api/djs/invite'
import {
  getInvestDetail,
  getPersonalAccount,
  expectedIncome,
  couponPackageApi,
  investApi,
  expireRepeatApi,
  getRedPacketNumApi,
  getCouponNumApi
} from '@/api/djs/investDetail'
import debounce from '@/assets/js/debounce'

import { mapGetters, mapState, mapMutations } from 'vuex'
import Cookie from 'js-cookie'

import { getQueryParameter } from '@/assets/js/utils'

export default {
  name: 'invest',
  components: {
    BScroll,
    Dialog,
    Confirm
  },
  data() {
    return {
      comeFrom: '', // 路由是从哪里来的
      projectNo: this.$route.query.projectNo, // 标的号
      protocolData: [], // 协议数据
      disableAmount: false, // 是否尾标（金额不可更改）
      lendBtnMsg: '提交', // 投资按钮的内容
      lendBtnDetail: '', // 投资按钮的具体描述
      canILend: false, // 投资按钮是否可点击
      agree: false, // 协议是否选中
      amount: Cookie.get('djsLendAmount') ? Cookie.get('djsLendAmount') : '', // 投资金额
      investDetail: '', // 标的详情
      amountInfo: '', // 账户金额详情
      expectedIncome: '- -', // 预期收益
      lendAllFlag: false, // 当前是否为全投状态
      errMsg: '', // 错误提示
      redPacketNum: 0, // 可用红包数量
      couponNum: 0, // 可用加息券数量
      investErrDialogOptions: {
        // 出借错误弹窗（resultCode !== '1'）
        show: false,
        msg: ''
      },
      riskPastDueDialogOptions: {
        // 风险测评过期
        show: false,
        msg: ''
      },
      authPastDueDialogOptions: {
        // 授权过期
        show: false,
        msg: ''
      },
      autoInvestDialogOptions: {
        // 自动出借产品成功弹窗
        show: false,
        title: '设置自动出借，省心赚钱'
      },
      autoLendTypeRadio: [
        {
          label: '本金到期后自动出借',
          value: '1'
        },
        {
          label: '本息到期后自动出借',
          value: '2'
        }
      ],
      autoLendType: '1', // 1:本金到期后自动出借  2:本息到期后自动出借
      invId: -1, // 投资记录id
      investType: '', // 标的类型 普通 || 手机乐活动
      autoLendSuccessDialogOptions: {
        // 自动出借成功弹窗
        show: false,
        title: '恭喜您，出借成功',
        msg: '',
        confirmText: ''
      },
      generalMsg: '还有很多优质产品，总还有一款适合您', // 自动出借成功描述
      autoLendSuccessType: -1, // 自动出借设置成功后判断出借类型的标识 0：普通标 1：手机乐活动标
      riskTestIsMax: '', // 风险测评类型是否达到最大
      riskTestDialogOptions: {
        // 风险测评弹窗
        show: false,
        msg: '',
        title: '',
        confirmText: '重新评测'
      },
      chargeDialogOption: {
        show: false,
        confirmText: '去充值'
      }
    }
  },
  computed: {
    isWeiBiao() {
      return parseFloat(this.investDetail.surplusAmount) < parseFloat(this.investDetail.minInvAmt * 2)
    },
    ...mapGetters(['user']),
    ...mapState({
      checkedCoupon: state => state.djsLend.djsLendCoupon, // 已选择的加息券
      checkedRedPacket: state => state.djsLend.djsLendRedPacket, // 已选择的红包
      djsChooseCouponFlag: state => state.djsLend.djsChooseCouponFlag, // 是否操作过加息券列表
      djsChooseRedPacketFlag: state => state.djsLend.djsChooseRedPacketFlag // 是否操作过红包列表
    })
  },
  watch: {
    amount: debounce(function(value) {
      // 输入的金额保留两位小数
      if (value.toString().indexOf('.') > 0 && value.toString().length - (value.toString().indexOf('.') + 1) > 2) {
        this.amount = ((value * 100) / 100).toFixed(2)
      }

      // cookie保存投资金额，保证红包 && 加息券页路由会跳时不会丢失数据
      Cookie.set('djsLendAmount', this.amount)

      // 项目剩余可投
      const surplusAmount = this.investDetail.surplusAmount

      // 判断全投状态
      this.lendAllFlag = parseFloat(value) - parseFloat(surplusAmount) === 0 || parseFloat(value) - parseFloat(this.amountInfo.banlance) === 0

      // 对比输入金额和可用金额case
      if (value !== '' && value - 0 < this.investDetail.minInvAmt - 0) {
        this.errMsg = '申购金额需' + this.investDetail.minInvAmt + '元起'
      } else if (parseFloat(value) - parseFloat(surplusAmount) > 0) {
        this.errMsg = '已超过限额' + surplusAmount + '元'
      } else {
        if (value - this.investDetail.singleLimit > 0) {
          this.errMsg = '超出单笔限额' + this.investDetail.singleLimit + '元'
        } else {
          this.errMsg = ''
        }
      }

      // if (value - this.amountInfo.banlance > 0) {
      //   this.lendBtnMsg = '账户余额不足，请充值'
      //   this.lendBtnDetail = `还需余额${value - this.amountInfo.banlance}元`
      // } else {
      //   this.lendBtnMsg = '提交'
      //   this.lendBtnDetail = ''
      // }

      // 根据投资金额获取可用的红包 && 加息券
      this.getCouponPackage(value)

      // 判断投资按钮的可点击状态
      this.canILend =
        parseFloat(value) - parseFloat(this.investDetail.minInvAmt) >= 0 && parseFloat(value) <= parseFloat(this.investDetail.surplusAmount)
    })
  },
  methods: {
    changeStatus() {
      this.agree = !this.agree
    },
    showAgre(url) {
      const agreementType = getQueryParameter(url, 'agreementType')
      this.$router.push({
        name: 'DJSagreement',
        query: { agreementType }
      })
    },
    confirmRiskPastDue() {
      this.$router.push({ name: 'riskTest' })
    },
    confirmAuthPastDue() {
      this.$router.push({
        name: 'signAgreement',
        query: {
          status: 0 // 签署自动投标功能
        }
      })
    },
    getExpectedIncome() {
      expectedIncome({
        invAmount: this.amount,
        investRate: this.investDetail.investRate,
        invDays: this.investDetail.investMent,
        couponRate: this.checkedCoupon ? this.checkedCoupon.couponRate : null,
        validDays: this.checkedCoupon ? this.checkedCoupon.validDays : null,
        redpacketID: this.checkedRedPacket ? this.checkedRedPacket.id : null
      }).then(res => {
        this.expectedIncome = res.data.expectedIncome
      })
    },
    lendAll() {
      if (!this.isWeiBiao) {
        this.amount = this.amountInfo.banlance
        this.lendAllFlag = true
      }
    },
    chooseCoupon() {
      let [checkedCoupon, checkedRedPacket] = []
      if (this.checkedCoupon) {
        if (this.checkedCoupon.couponInfoId) {
          checkedCoupon = this.checkedCoupon.couponInfoId
        } else {
          checkedCoupon = this.checkedCoupon.id
        }
      } else {
        checkedCoupon = null
      }

      if (this.checkedRedPacket) {
        if (this.checkedRedPacket.redPacketId) {
          checkedRedPacket = this.checkedRedPacket.redPacketId
        } else {
          checkedRedPacket = this.checkedRedPacket.id
        }
      } else {
        checkedRedPacket = null
      }

      this.$router.push({
        name: 'DJSLendChooseCoupon',
        params: {
          projectNo: this.projectNo,
          amount: this.amount,
          redPacketId: checkedRedPacket,
          couponId: checkedCoupon
        }
      })
    },
    chooseRedPacket() {
      let [checkedCoupon, checkedRedPacket] = []
      if (this.checkedCoupon) {
        if (this.checkedCoupon.couponInfoId) {
          checkedCoupon = this.checkedCoupon.couponInfoId
        } else {
          checkedCoupon = this.checkedCoupon.id
        }
      } else {
        checkedCoupon = null
      }

      if (this.checkedRedPacket) {
        if (this.checkedRedPacket.redPacketId) {
          checkedRedPacket = this.checkedRedPacket.redPacketId
        } else {
          checkedRedPacket = this.checkedRedPacket.id
        }
      } else {
        checkedRedPacket = null
      }

      this.$router.push({
        name: 'DJSLendChooseRedPacket',
        params: {
          projectNo: this.projectNo,
          amount: this.amount,
          couponId: checkedCoupon,
          redPacketId: checkedRedPacket
        }
      })
    },
    getCouponPackage(amount) {
      couponPackageApi({
        userName: this.user.userName,
        projectNo: this.projectNo,
        amount: amount
      }).then(res => {
        const data = res.data
        if (data.availableCouponCount > 0) {
          this.initCoupon(data.optimalCoupon)
        } else {
          this.clearCoupon()
        }

        if (data.availableRedPacketCount > 0) {
          this.initRedPacket(data.optimalRedpacket)
        } else {
          this.clearRedPacket()
        }

        // 根据最优券包计算预期收益
        this.getExpectedIncome()
      })
    },
    initCouponPackage(amount) {
      couponPackageApi({
        userName: this.user.userName,
        projectNo: this.projectNo,
        amount: amount
      }).then(res => {
        const data = res.data
        if (JSON.parse(this.djsChooseCouponFlag)) {
          if (data.availableCouponCount > 0) {
            this.initCoupon(data.optimalCoupon)
          } else {
            this.clearCoupon()
          }
        } else {
          this.initCoupon(this.checkedCoupon)
        }

        if (JSON.parse(this.djsChooseRedPacketFlag)) {
          if (data.availableRedPacketCount > 0) {
            this.initRedPacket(data.optimalRedpacket)
          } else {
            this.clearRedPacket()
          }
        } else {
          this.initRedPacket(this.checkedRedPacket)
        }

        // 根据最优券包计算预期收益
        this.getExpectedIncome()
      })
    },
    invest() {
      if (!this.canILend) return

      if (!this.agree) return

      if (this.amount - 0 > this.amountInfo.banlance - 0) {
        this.chargeDialogOption.show = true
        return
      }

      let checkedCoupon, checkedRedPacket
      if (this.checkedCoupon) {
        if (this.checkedCoupon.userCouponId) {
          checkedCoupon = this.checkedCoupon.userCouponId
        } else {
          checkedCoupon = this.checkedCoupon.id
        }
      } else {
        checkedCoupon = null
      }

      if (this.checkedRedPacket) {
        if (this.checkedRedPacket.userRedPacketId) {
          checkedRedPacket = this.checkedRedPacket.userRedPacketId
        } else {
          checkedRedPacket = this.checkedRedPacket.id
        }
      } else {
        checkedRedPacket = null
      }

      investApi({
        userName: this.user.userName,
        projectNo: this.projectNo,
        invAmount: this.amount,
        userCouponId: checkedCoupon,
        userRedPacketId: checkedRedPacket,
        investSource: 'h5'
      }).then(res => {
        const data = res.data
        switch (data.resultCode) {
          case '1':
            this.cleanData()
            if (this.investDetail.doubleBonuCouponEntity.dbCouponRate || this.investDetail.doubleBonuCouponEntity.dbValidDays !== null) {
              // 可以加息复投
              this.invId = data.id
              this.investType = data.investType
              this.autoInvestDialogOptions.show = true
              this.generalMsg = data.successInfo
            } else {
              this.autoLendSuccessDialogOptions.show = true
              if (data.investType === 'SJLHD') {
                // 手机乐活动
                this.autoLendSuccessDialogOptions.msg = this.generalMsg
                this.autoLendSuccessDialogOptions.confirmText = '查看更多'
                this.autoLendSuccessType = 1
              } else {
                // 普通产品
                this.autoLendSuccessDialogOptions.msg = '还有很多优质产品，总还有一款适合您'
                this.autoLendSuccessDialogOptions.confirmText = '查看更多'
                this.autoLendSuccessType = 0
              }
            }
            break
          case '90021':
            // 风险测评等级不符
            this.riskTestDialogOptions.show = true
            this.riskTestDialogOptions.title = '风险测评等级不符'
            this.riskTestDialogOptions.msg = res.data.resultMsg
            if (['JINX'].includes(data.data.evaluatingResult)) {
              // 激进型
              this.riskTestIsMax = true
              this.riskTestDialogOptions.confirmText = '我知道了'
            }
            break
          case '90022':
            // 风险测评过期
            this.riskTestDialogOptions.show = true
            this.riskTestDialogOptions.title = '风险测评过期'
            this.riskTestDialogOptions.msg = res.data.resultMsg
            this.riskTestIsMax = false
            break
          case '90034':
            // 授权过期
            this.authPastDueDialogOptions.show = true
            this.authPastDueDialogOptions.msg = data.resultMsg
            break
          case '90035':
            // 授权金额超限
            this.authPastDueDialogOptions.show = true
            this.authPastDueDialogOptions.msg = data.resultMsg
            break
          case '0':
            // 风险测评过期
            this.riskPastDueDialogOptions.show = true
            this.riskPastDueDialogOptions.msg = data.resultMsg
            break
          default:
            this.investErrDialogOptions.show = true
            this.investErrDialogOptions.msg = data.resultMsg
        }
      })
    },
    confirmAutoInvest() {
      expireRepeatApi({
        invId: this.invId,
        projectNo: this.projectNo,
        repeatStatus: this.autoLendType
      }).then(res => {
        const data = res.data
        if (data.resultCode === '1') {
          switch (this.investType) {
            case 'GENERAL':
              // 普通标
              this.autoLendSuccessDialogOptions.msg = '还有很多优质产品，总还有一款适合您'
              this.autoLendSuccessType = 0
              this.autoLendSuccessDialogOptions.confirmText = '查看更多'
              break
            case 'SJLHD':
              // 手机乐活动
              this.autoLendSuccessDialogOptions.msg = this.generalMsg
              this.autoLendSuccessType = 1
              this.autoLendSuccessDialogOptions.confirmText = '查看更多'
              break
          }
          this.autoLendSuccessDialogOptions.show = true
        } else {
          this.investErrDialogOptions.show = true
          this.investErrDialogOptions.msg = data.resultMsg
        }
      })
    },
    confirmCharge() {
      this.$router.push({ name: 'DJSCharge' })
    },
    closeAutoInvest() {
      switch (this.investType) {
        case 'GENERAL':
          // 普通标
          this.autoLendSuccessDialogOptions.msg = '还有很多优质产品，总还有一款适合您'
          this.autoLendSuccessType = 0
          this.autoLendSuccessDialogOptions.confirmText = '查看更多'
          break
        case 'SJLHD':
          // 手机乐活动
          this.autoLendSuccessDialogOptions.msg = this.generalMsg
          this.autoLendSuccessType = 1
          this.autoLendSuccessDialogOptions.confirmText = '查看更多'
          break
      }
      this.autoLendSuccessDialogOptions.show = true
    },
    confirmAutoLendSXS() {
      this.$router.push({
        name: 'DJSInvestment'
      })

      // 其实这个才是正常的逻辑，但产品似乎并不希望跳转到设置地址，只好都去投资列表
      /*switch (this.autoLendSuccessType) {
        case 0:
          this.$router.push({
            name: 'DJSInvestment'
          })
          break
        case 1:
          this.$router.push({
            name: 'receiveAddress'
          })
          break
      }*/
    },
    confirmRiskText() {
      if (!this.riskTestIsMax) {
        this.$router.push({
          name: 'riskTest'
        })
      }
    },
    getAccount() {
      getPersonalAccount({
        userName: this.user.userName,
        projectNo: this.projectNo
      }).then(res => {
        const data = res.data
        this.amountInfo = data
        if (parseFloat(data.banlance) < parseFloat(this.investDetail.minInvAmt)) {
          this.lendBtnMsg = '提交'
          // this.lendBtnMsg = '账户余额不足，去充值'
          // this.lendBtnDetail = `还需余额${investDetail.minInvAmt - amountInfo.banlance}元`
          this.canILend = false
        }
        if (this.amount !== '') {
          if (data.banlance - 0 === this.amount - 0) {
            this.lendAllFlag = true
          }
          this.getExpectedIncome()
        }
      })
    },
    ...mapMutations({
      cleanData: 'CLEAN_DJS_LEND_DATA',
      initCoupon: 'CHOOSE_DJS_COUPON',
      clearCoupon: 'CLEAN_DJS_COUPON',
      initRedPacket: 'CHOOSE_DJS_REDPACKET',
      clearRedPacket: 'CLEAN_DJS_REDPACKET',
      setCouponFlag: 'SET_DJS_CHOOSE_COUPON_FLAG',
      setRedPacketFlag: 'SET_DJS_CHOOSE_REDPACKET_FLAG'
    })
  },
  created() {
    // 如果不是从充值来的才使用Indicator
    if (this.comeFrom !== 'DJSCharge') {
      Indicator.open()
    }
    const $this = this
    ;(async function initData() {
      await getInvestDetail({
        projectNo: $this.projectNo
      }).then(res => {
        const data = res.data
        $this.investDetail = data
        // 尾标
        if (parseFloat(data.surplusAmount) < parseFloat(data.minInvAmt * 2)) {
          $this.amount = data.surplusAmount
          $this.disableAmount = true
        } else {
          if ($this.amount - 0 >= data.minInvAmt - 0) {
            $this.canILend = true
          }
        }
      })

      await getProtocaol({
        type: 'TZJE'
      }).then(res => {
        if (res.data.resultCode === '1') {
          const data = res.data.data
          $this.protocolData = data.result
          $this.agree = data.result[0].isChecked
        } else {
          Toast(res.data.resultMsg)
        }
      })

      await $this.initCouponPackage($this.amount)

      let [checkedCoupon, checkedRedPacket] = []
      if ($this.checkedCoupon) {
        if ($this.checkedCoupon.couponInfoId) {
          checkedCoupon = $this.checkedCoupon.couponInfoId
        } else {
          checkedCoupon = $this.checkedCoupon.id
        }
      } else {
        checkedCoupon = null
      }

      if ($this.checkedRedPacket) {
        if ($this.checkedRedPacket.userRedPacketId) {
          checkedRedPacket = $this.checkedRedPacket.userRedPacketId
        } else {
          checkedRedPacket = $this.checkedRedPacket.id
        }
      } else {
        checkedRedPacket = null
      }

      await getCouponNumApi({
        userName: $this.user.userName,
        projectNo: $this.projectNo,
        amount: $this.amount,
        redPacketId: checkedRedPacket
      }).then(res => {
        if (res.data.resultCode === '1') {
          const data = res.data
          $this.couponNum = data.count
          // 默认展示推荐的券包组合
          // if (data.count === 0) {
          //   $this.clearCoupon()
          // }
        } else {
          Toast(res.data.resultMsg)
        }
      })

      await getRedPacketNumApi({
        userName: $this.user.userName,
        projectNo: $this.projectNo,
        amount: $this.amount,
        couponId: checkedCoupon
      }).then(res => {
        if (res.data.resultCode === '1') {
          const data = res.data
          $this.redPacketNum = data.count
          // 默认展示推荐的券包组合
          // if (data.count === 0) {
          //   $this.clearRedPacket()
          // }
        } else {
          Toast(res.data.resultMsg)
        }
      })

      // 如果不是从充值来的调用获取账户信息，否则执行beforeRouteEnter逻辑
      if ($this.comeFrom !== 'DJSCharge') {
        await $this.getAccount()
      }

      if ($this.comeFrom !== 'DJSCharge') {
        await Indicator.close()
      }
    })()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const [comeFrom, during] = ['DJSCharge', 3000]
      // 如果是从充值页跳转来的，loading 3s 在刷新金额
      if (from.name === comeFrom) {
        vm.comeFrom = comeFrom
        Indicator.open()

        setTimeout(() => {
          Indicator.close()
          vm.getAccount()
        }, during)
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    // 如果不是跳转到选择卡券页面，重置投资金额
    if (!['DJSLendChooseCoupon', 'DJSLendChooseRedPacket'].includes(to.name)) {
      Cookie.remove('djsLendAmount')
      this.clearCoupon()
      this.clearRedPacket()
      this.setCouponFlag(true)
      this.setRedPacketFlag(true)
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.lend-wrapper {
  height: 100%;
  background: #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .lend {
    flex: 1;
    overflow: hidden;
    .huge {
      @include cube(100%, auto);
      margin-bottom: 0.08rem;
      background-color: #ec5e52;
      padding: 0 0.15rem;
      ul {
        padding: 0.2rem 0;
        @include border-bottom-1px(rgba(255, 255, 255, 0.5));
        display: flex;
        justify-content: space-between;
        li {
          flex: 1;
          align-self: center;
          color: #ffffff;
          font-size: 0.15rem;
          span {
            font-size: 0.36rem;
            &.pre {
              font-size: 0.15rem;
            }
          }
          label {
            font-size: 0.18rem;
          }
          em {
            font-size: 0.18rem;
          }
          h5 {
            font-size: 0.15rem;
            line-height: 1.75;
          }
          h6 {
            font-size: 0.13rem;
            line-height: 1.75;
          }
        }
      }
      > p {
        color: #fff;
        font-size: 0.13rem;
        line-height: 0.32rem;
        span:last-child {
          margin-left: 0.16rem;
        }
      }
    }
    .newbie {
      @include cube(3.45rem, 0.4rem);
      margin: 0.05rem auto 0.15rem;
      background: linear-gradient(270deg, #ff9736, #ff5e19);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        position: relative;
        width: 0.5rem;
        font-size: 0.13rem;
        color: #fff;
        text-align: center;
        line-height: 1.3;
        &:after {
          content: '';
          position: absolute;
          @include cube(0.02rem, 0.2rem);
          background: #fff;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto 0;
        }
      }
      .loading {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 0.1rem;
        section {
          @include cube(1.7rem, 0.14rem);
          background-image: url('./images/loading.png');
          background-size: 1.7rem 0.14rem;
          background-repeat: no-repeat;
        }
      }
      p {
        width: 1rem;
        span {
          color: #fff;
          &:first-child {
            font-size: 0.11rem;
          }
          &:last-child {
            font-size: 0.13rem;
          }
        }
      }
    }
    .amount-block {
      background: #fff;
      padding-top: 0.16rem;
      position: relative;
      margin-bottom: 0.08rem;
      h6 {
        padding: 0 0.15rem;
        font-size: 0.13rem;
        color: #999999;
      }
      section {
        padding: 0 0.15rem;
        height: 0.5rem;
        display: flex;
        justify-content: space-between;
        @include border-bottom-1px(#eee);
        div {
          width: 0.25rem;
          padding-right: 0.1rem;
          font-size: 0.24rem;
          line-height: 0.5rem;
          color: #333;
        }
        input {
          flex: 1;
          padding: 0.08rem 0;
          font-size: 0.15rem;
          &::placeholder {
            color: #999;
          }
        }
      }
      .err-msg {
        line-height: 0.24rem;
        background: rgba(255, 0, 0, 0.15);
        padding: 0 0.15rem;
        font-size: 0.11rem;
        color: #f14b4b;
      }
      .ctrl {
        padding: 0 0.15rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div {
          p {
            margin: 0.08rem 0;
            font-size: 0.11rem;
            span {
              i {
                font-size: 0.1rem;
                margin-right: 0.05rem;
              }
              &.key {
                color: #999;
              }
              &.value {
                font-size: 0.11rem;
                color: #ec5e52;
                margin-left: 0.05rem;
              }
            }
          }
        }
        button {
          @include radiusCube(0.78rem, 0.28rem);
          font-size: 0.13rem;
          line-height: 0.26rem;
          background: #ffffff;
          border: 0.01rem solid #333;
          padding: 0;
          &.active {
            border: 0.01rem solid #ec5e52;
            color: #ec5e52;
          }
        }
      }
    }
    .coupon {
      background: #ffffff;
      padding-left: 0.15rem;
      margin-bottom: 0.08rem;
      li {
        height: 0.5rem;
        padding-right: 0.15rem;
        &:first-child {
          @include border-bottom-1px(#eee);
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 0.15rem;
        }
        p,
        label {
          display: inline-block;
          font-size: 0.15rem;
          color: #999;
        }
        label {
          color: #ec5e52;
        }
        i {
          font-size: 0.13rem;
          color: #999;
          margin-left: 0.1rem;
        }
      }
    }
    .agree {
      margin: 0.16rem auto 0.08rem;
      padding: 0 0.15rem 0 0.37rem;
      font-size: $font-size-small-s;
      line-height: 0.18rem;
      position: relative;
      input[type='checkbox'] {
        display: none;
      }
      label {
        position: absolute;
        left: 0.15rem;
        &:before {
          box-sizing: border-box;
          content: '';
          display: inline-block;
          width: 0.14rem;
          height: 0.14rem;
          background-color: #fff;
          border: 0.05rem solid #ccc;
          border-radius: 0.2rem;
          margin-right: 0.1rem;
          vertical-align: middle;
        }
      }
      input.active + label:before {
        border: 0.05rem solid $color-button;
      }
      section {
        line-height: 1.7;
      }
      .agreement {
        color: $color-button;
      }
    }
    .state {
      box-sizing: border-box;
      width: 3.2rem;
      margin: 0 auto;
      padding-left: 0.1rem;
      font-size: 0.13rem;
      color: #999;
      line-height: 0.18rem;
    }
  }
  .invest-btn {
    @include cube(100%, 0.56rem);
    background: #fff;
    box-shadow: inset 0 0.01rem 0 0 #eee;
    section {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin: 0.07rem auto;
      @include cube(3.45rem, 0.42rem);
      border-radius: 0.04rem;
      background: #ccc;
      transition: 0.4s;
      &.active {
        background: #ec5e52;
      }
      h6 {
        font-size: 0.15rem;
        color: #fff;
        text-align: center;
      }
      p {
        font-size: 0.12rem;
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
      }
    }
  }
  .auto-lend-dialog {
    p {
      font-size: 0.13rem;
      font-weight: 500;
      color: #666;
      line-height: 0.18rem;
      margin-bottom: 0.36rem;
    }
    /deep/ .mint-cell-wrapper {
      background-image: none;
    }
    /deep/ .mint-cell {
      background-image: none;
      min-height: 0.4rem;
    }
    .agre {
      font-size: 0.13rem;
      color: #666;
      text-align: center;
    }
  }
  .auto-lend-sxs-dialog {
    /deep/ .inner {
      padding-top: 1rem;
      header {
        margin-bottom: 0.23rem;
      }
    }
    img {
      position: absolute;
      @include square(1.3rem);
      left: 0;
      right: 0;
      top: 0;
      margin: 0 auto;
      transform: translateY(-50%);
    }
  }
}
</style>
