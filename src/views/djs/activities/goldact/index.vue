<template>
  <div class="gold" ref="container">
    <div class="inner" :class="{ blur: detailFlag }">
      <div class="wrapper">
        <!--<div class="detail" @click="showDetail"></div>-->
      </div>
      <div style="background: rgb(204,52,41);height:60px;"></div>
      <div class="btn-wrapper all" v-if="type === '0'">
        <a class="btn" id="three-months" href="https://mobile.hyoucai.com/#/d/investdetail?projectNo=1901040801">
          <span>出借黄金乐90天</span>
        </a>
        <a class="btn" id="halfYear" href="https://mobile.hyoucai.com/#/d/investdetail?projectNo=1901040802">
          <span>出借黄金乐180天</span>
        </a>
      </div>
      <div class="btn-wrapper half" v-else>
        <a class="btn" v-if="type !== '2'" href="https://mobile.hyoucai.com/#/d/investdetail?projectNo=1901040801">
          出借黄金乐90天
        </a>
        <a class="btn" v-if="type !== '1'" href="https://mobile.hyoucai.com/#/d/investdetail?projectNo=1901040802">
          出借黄金乐180天
        </a>
      </div>
    </div>
    <div class="detail-mask" v-if="detailFlag">
      <img src="./off.png" class="close" alt="" @click="closeDialog" />
      <img src="./dialog.png" alt="" />
    </div>
  </div>
</template>

<script>
import api from '@/api/common/activities'

export default {
  name: 'mateact',
  data() {
    return {
      type: this.$route.query.type,
      detailFlag: false
    }
  },
  methods: {
    beforeScroll() {
      this.$refs.scrollRef.refresh()
    },
    showDetail() {
      this.detailFlag = true
    },
    closeDialog() {
      this.detailFlag = false
    }
  },
  created() {
    const [shareTitle, shareDesc, shareImgUrl, shareLink] = [
      '新年福利，免费送黄金',
      '只要5.98万，免费送黄金，最高享6%年化利息，黄金也能保值',
      'http://h5.dpandora.cn/images/favicon.ico',
      'https://m.idjshi.com/website/activity.html#/gold?mobile=1&type=0'
    ]

    api
      .getPageSinatureApi({
        url: window.location.href
      })
      .then(res => {
        const data = res.data
        wx.config({
          debug: false,
          // appId: data.appid,
          appId: 'wx45d16cf33a73b663',
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
        })
        wx.ready(() => {
          wx.onMenuShareTimeline({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle
          })
          wx.onMenuShareAppMessage({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
          wx.onMenuShareQQ({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
          wx.onMenuShareWeibo({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
          wx.onMenuShareQZone({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
        })
      })

    const activityId = this.$route.query.activityId
    const userName = this.$route.query.userName

    const t = setInterval(() => {
      if (window.DjsJsBridge && activityId) {
        api
          .getShareInfoApi({
            id: activityId,
            userName: userName
          })
          .then(res => {
            if (res.data.resultCode === '1') {
              const data = res.data
              const params = {
                title: data.title,
                content: data.description,
                imgUrl: data.iconUrl,
                shareType: data.shareType,
                backPicUrl: data.backPicUrl,
                qrPicUrl: data.qrPicUrl,
                url: window.location.href
              }
              let shareInfo = JSON.stringify(params)
              window.DjsJsBridge.getShareKey(shareInfo)
              clearInterval(t)
            }
          })
      }
    }, 400)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
@import '../../../../assets/css/mixins.scss';

.inner.blur {
  filter: blur(4px);
}

.wrapper {
  position: relative;
  width: 100%;
  height: 14.17rem;
  background: url('gold-bg.png');
  background-size: cover;
}

.bg-img {
  opacity: 0;
  display: block;
  width: 100%;
}

.btn-wrapper {
  position: fixed;
  width: 100%;
  height: 0.6rem;
  bottom: 0;
  left: 0;
  display: flex;
  background: rgb(204, 52, 41);
  &.all {
    .btn {
      font-weight: bold;
      transform: scale(0.85) translateY(0.05rem);
      height: 0.5rem;
      line-height: 0.5rem;
      border-radius: 0.3rem;
      background: linear-gradient(#fefe64, #fec530);
      box-shadow: 0 4px 4px #ff911e;
      font-size: 0.2rem;
      &:first-child {
        @include border-right-1px(#ef263d);
      }
      span {
        font-size: 0.22rem;
        font-weight: bold;
      }
    }
  }
  &.half {
    .btn {
      font-weight: 700;
      transform: scale(0.85) translateY(0.05rem);
      height: 0.5rem;
      line-height: 0.5rem;
      border-radius: 0.3rem;
      background: linear-gradient(#fefe64, #fec530);
      box-shadow: 0 4px 4px #ff911e;
      font-size: 0.2rem;
    }
  }
}

.detail {
  width: 0.7rem;
  height: 0.23rem;
  position: absolute;
  background: url('./detail.png') 0 / contain;
  top: 0.15rem;
  right: 0;
}
.btn {
  flex: 1;
  font-size: 0.16rem;
  text-align: center;
  line-height: 0.55rem;
  color: #ef263d;
}

.detail-mask {
  position: fixed;
  z-index: 9999999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.15rem;
  background: rgba(0, 0, 0, 0.4);
  .close {
    @include radiusCube(0.23rem);
    align-self: flex-end;
    margin-bottom: 0.15rem;
  }
}
</style>
