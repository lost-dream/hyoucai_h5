<template>
  <b-scroll
    class="scroll"
    ref="scrollRef1"
    :data="yZhiJiHuaDataCompute"
    :pullup="pullup"
    :touchend="touchend"
    :listenScroll="listenScroll"
    @scroll="scroll"
    @scrollToEnd="scrollToEnd1"
    @pulldownTouchend="pulldownTouchend"
  >
    <div>
      <ul>
        <li v-for="(item, index) in yZhiJiHuaData" :key="index" @click="selectYZhiJiHuaItem(item.projectNo)">
          <investment-item :itemData="item"></investment-item>
        </li>
        <no-data v-if="!yZhiJiHuaData.length"></no-data>
      </ul>
      <dl class="tips">
        <dt><img src="./image/cunguan.png" alt="" /></dt>
        <dd>账户资金安全由江西银行和人寿财险共同保障</dd>
      </dl>
    </div>
  </b-scroll>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import InvestmentItem from '@/components/InvestmentItem/InvestmentItem'
import { collectionApi } from '@/api/djs/investment'
import { getInvestDetail } from '@/api/djs/investDetail'
import NoData from '@/components/NoData/NoData'
import { mapGetters } from 'vuex'

const CODE_OK = '1'

function initTime(t = 0) {
  if (t <= 0) {
    return '00:00:00'
  }
  let d = (t - (t % 86400)) / 86400
  let h = ((t - (t % 3600)) / 3600) % 24
  let i = ((t - (t % 60)) / 60) % 60
  let s = t % 60
  let result = ''
  if (d > 0) {
    result += d + '天'
  }
  result += h.toString().padStart(2, '0') + ':'
  result += i.toString().padStart(2, '0') + ':'
  result += s.toString().padStart(2, '0')
  return result
}

let Timer1 = null // 优质计划计时器
let Timer2 = null // 散标计时器
export default {
  components: {
    BScroll,
    InvestmentItem,
    NoData
  },
  data() {
    return {
      pulldown: true,
      pulldownFresh: false, // 下拉loading出现标志
      pulldownFreshText: '下拉刷新',
      pullup: true, // 开启上拉加载
      touchend: true, // 开启监听松开手指事件
      listenScroll: true, //  开启监听scroll滚动位置
      perpage: 15,
      page1: 1,
      hasMore1: true,
      yZhiJiHuaData: [],
      id: '',
      showFiltered: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    // 优质计划
    selectYZhiJiHuaItem(projectNo) {
      if (!this.user) {
        this.$router.push({
          name: 'loginRegister'
        })
      } else {
        getInvestDetail({
          projectNo: projectNo
        }).then(res => {
          if (res.data.resultCode === '1') {
            this.$router.push({ name: 'DJSInvestDetail', query: { projectNo: projectNo } })
          } else {
            Toast(res.data.resultMsg)
          }
        })
      }
    },
    getList(maxLine, curPage) {
      let data = {
        maxLine: maxLine,
        curPage: curPage
      }
      Indicator.open('正在加载')
      collectionApi(data).then(res => {
        Indicator.close()
        let resp = res.data
        if (resp.resultCode === CODE_OK) {
          let list = resp.investsList
          let curPage = resp.curPage
          let countPage = resp.countPage
          this.yZhiJiHuaData = []
          this.yZhiJiHuaDataCompute = [...this.yZhiJiHuaDataCompute, ...list]
          this.countDown(this.yZhiJiHuaData, this.yZhiJiHuaDataCompute)
          if (!list.length) {
            this.hasMore1 = false
            Toast('无记录')
          } else {
            this.hasMore1 = curPage < countPage
          }
        } else {
          Toast(resp.resultMsg)
        }
      })
    },
    clickGetYZhiJiHuaData(maxLine, curPage) {
      this.getList(maxLine, curPage)
    },
    scrollGetYZhiJiHuaData(maxLine, curPage) {
      this.getList(maxLine, curPage)
    },
    scrollToEnd1() {
      // 上拉到底部，加载更多
      if (!this.hasMore1) {
        Toast('没有更多')
        return
      }
      this.page1++
      this.scrollGetYZhiJiHuaData(this.perpage, this.page1)
    },
    scroll(pos) {
      // 监控上下拉
      if (pos.y > 10) {
        this.pulldownFresh = true
      }
      if (pos.y > 30) {
        this.pulldownFreshText = '松开刷新'
      }
    },
    pulldownTouchend(pos) {
      // 下拉松开手指，刷新
      if (pos.y >= 0 && this.pulldownFresh) {
        this.pulldownFreshText = '正在刷新'
        setTimeout(() => {
          this.pulldownFresh = false
          Toast('刷新成功')
          this.refresh()
        }, 500)
      }
    },
    refresh() {
      this.$refs.scrollRef1.refresh()
    },
    countDown(data, list) {
      let listRes = list
      listRes.map(obj => {
        if (obj.remainingSeconds && obj.remainingSeconds > 0) {
          this.$set(obj, 'djs', initTime(obj.remainingSeconds))
        }
      })
      data = JSON.parse(JSON.stringify(listRes))
      clearInterval(Timer1)
      this.yZhiJiHuaData = []
      this.yZhiJiHuaData = JSON.parse(JSON.stringify(listRes))
      Timer1 = setInterval(() => {
        if (data.some(item => (item.remainingSeconds && item.remainingSeconds > 0) || item.status === 1)) {
          data.map(item => {
            let t = item['remainingSeconds']
            if (t < 1) {
              item['status'] = 2
              item['remainingSeconds'] = 0
              item['investEndTimestamp'] = 55555
              item['investPercent'] = 99.99
            } else {
              item['remainingSeconds']--
              item['djs'] = initTime(t)
            }
          })
        } else {
          clearInterval(Timer1)
        }
        this.yZhiJiHuaData = data
      }, 1000)
    }
  },
  created() {
    this.yZhiJiHuaDataCompute = []
    this.clickGetYZhiJiHuaData()
  },
  mounted() {},
  destroyed() {
    clearInterval(Timer1)
    clearInterval(Timer2)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
@import '../../../assets/css/mixins.scss';

.scroll {
  height: 100%;
  overflow: hidden;
  .top {
    margin: 0 auto;
    padding: 0.2rem 0;
    background-color: #fff;
    .inn {
      position: relative;
      width: 92%;
      height: 1.77rem;
      margin: 0 auto;
      padding: 0.16rem 0.16rem 0.08rem;
      box-shadow: 0 0.02rem 0.16rem 0 rgba(204, 204, 204, 0.4);
      border-radius: 0.04rem;
      background-color: #fff;
      text-align: center;
      em {
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        width: 0.7rem;
        height: 0.22rem;
        line-height: 0.22rem;
        color: #fff;
        font-size: $font-size-small-ss;
        text-align: center;
        background-image: url('./image/ranctangel.png');
        background-size: 100% 100%;
      }
      .wrapper {
        display: flex;
        padding-left: 0.2rem;
        font-size: 0;
        dl {
          flex: 1;
          dd {
            font-size: $font-size-small-s;
            color: $color-text-s;
          }
          &:nth-of-type(1) {
            text-align: center;
            dt {
              font-size: 0.33rem;
              color: $color-button;
              span {
                font-size: 0.15rem;
              }
            }
          }
          &:nth-of-type(2) {
            position: relative;
            dt {
              position: absolute;
              bottom: 0.3rem;
              left: 10%;
              font-size: $font-size-small;
              color: $color-text-b;
            }
            dd {
              position: absolute;
              left: 10%;
              bottom: 0;
              padding: 0.03rem 0.05rem;
              color: #ab917c;
              font-size: $font-size-small-ss;
              background-color: #efefef;
            }
          }
        }
      }
      button {
        display: block;
        width: 100%;
        height: 0.4rem;
        margin: 0.26rem 0 0.07rem;
        background-color: $color-button;
        color: #fff;
        font-size: 0.16rem;
        border-radius: 0.04rem;
      }
      span {
        color: #333;
        font-size: $font-size-small-s;
        text-align: center;
      }
    }
  }
  ul {
    li {
      position: relative;
      background-color: #fff;
      &:first-child {
        /deep/ .prod_item {
          .cata_title {
            margin-top: 0;
          }
        }
      }
    }
  }
  .tips {
    text-align: center;
    font-size: 0;
    padding: 0.09rem 0;
    dt,
    dd {
      display: inline-block;
      vertical-align: top;
    }
    dt {
      width: 0.13rem;
      margin-right: 0.05rem;
      margin-top: 0.02rem;
    }
    dd {
      font-size: $font-size-small-s;
      color: #999;
    }
  }
  .all_prods {
    display: block;
    width: 92%;
    height: 0.44rem;
    margin: 0.32rem auto 0;
    border-radius: 0.04rem;
    background-color: $color-button;
    font-size: $font-size-small;
    color: #fff;
    text-align: center;
  }
}
</style>
