<template>
  <BScroll
    class="claim_wrap"
    ref="claimWrapper"
    :probeType="BScrollOption.probeType"
    :listen-scroll="BScrollOption.listenScroll"
    :pullup="BScrollOption.pullup"
    @scrollToEnd="scrollToEnd"
  >
    <div>
      <table class="claim_list" v-if="claimListData.length > 0">
        <thead>
          <tr>
            <td>借款人/出让人</td>
            <td>剩余可投/出让本息</td>
            <td>债权详情</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in claimListData" :key="index">
            <td>{{ item.ownBondName }}</td>
            <td>{{ item.totalBondAmt }}</td>
            <td @click="linkTo(item)">详情</td>
          </tr>
        </tbody>
      </table>
      <NoData v-else></NoData>
    </div>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import { Toast, Indicator } from 'mint-ui'
import { getClaimList } from '@/api/djs/investDetail'
import NoData from '@/components/NoData/NoData'
export default {
  name: 'DJSClaimList',
  components: {
    BScroll,
    NoData
  },
  data() {
    return {
      projectNo: this.$route.query.projectNo,
      claimListData: [],
      BScrollOption: {
        probeType: 3,
        listenScroll: true,
        pullup: true
      },
      page: 1,
      hasMore: true
    }
  },
  methods: {
    linkTo(data) {
      this.$router.push({
        name: 'DJSClaimDetail',
        params: {
          data
        }
      })
    },
    getData() {
      Indicator.open()
      getClaimList({
        projectNo: this.projectNo,
        curPage: this.page
      }).then(res => {
        Indicator.close()
        const [list, curPage, countPage] = [res.data.list, res.data.curPage, res.data.countPage]
        if (!list.length) {
          this.hasMore = false
          Toast('没有更多数据了')
        } else {
          this.hasMore = parseInt(curPage) <= parseInt(countPage)
        }
        this.claimListData = [...this.claimListData, ...list]
        this.$nextTick(() => {
          this.$refs.claimWrapper.refresh()
        })
      })
    },
    scrollToEnd() {
      if (this.hasMore) {
        this.page++
        this.getData()
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';
.claim_wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 100%;
  .claim_list {
    flex: 1;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    width: 100%;
    background: #fff;
    thead {
      tr {
        height: 0.5rem;
        border-bottom: 0.01rem solid #eeeeee;
        td {
          font-size: 0.13rem;
          color: #999999;
          letter-spacing: 0.0016rem;
          text-align: center;

          &:nth-of-type(1) {
            width: 0.47rem;
            height: 0.36rem;
            padding: 0.07rem 0.82rem 0.07rem 0.15rem;
          }
          &:nth-of-type(2) {
            width: 0.6rem;
            height: 0.36rem;
            padding: 0.07rem 1.03rem 0.07rem 0;
          }
          &:nth-last-of-type(1) {
            padding: 0 0.15rem 0 0;
          }
        }
      }
    }

    tbody {
      tr {
        height: 0.5rem;
        border-bottom: 0.01px solid #eeeeee;
        td {
          width: 33%;
          font-size: 13px;
          color: #333333;
          letter-spacing: 0.016rem;
          &:nth-of-type(1) {
            padding: 0.16rem 0.15rem;
            text-align: left;
          }
          &:nth-last-of-type(1) {
            font-size: 0.13rem;
            color: #ec5e52;
            letter-spacing: 0.0016rem;
            text-align: right;
            padding: 0.16rem 0.28rem 0.16rem 0;
          }
        }
      }
    }
  }
}
</style>
