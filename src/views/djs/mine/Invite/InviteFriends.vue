<template>
  <div class="content">
    <b-scroll class="scroll" ref="scrollRef">
      <div>
        <div class="image">
          <img src="./images/invite-banner.png" alt />
        </div>
        <div class="information">
          <div class="information_top">
            <!--<p class="information_p">-->
            <!--<span class="information_txt">感谢金</span>-->
            <!--<span class="information_number">2400元</span>-->
            <!--</p>-->
            <p class="information_p">
              <span class="information_txt">我推荐的人</span>
              <span class="information_number">{{ recommend }}人</span>
            </p>
          </div>
          <div class="go_look" @click="showDetail">
            <img src="./images/lookbtn.png" alt="" />
          </div>
        </div>
        <div class="recommendation_code">
          <span class="txt">我的推荐码：</span>
          <span class="number">{{ myInviteCode }}</span>
        </div>
        <div class="btns">
          <button class="btn scan" @click="scan">
            <img src="./images/scan.png" alt />
          </button>
        </div>
      </div>
    </b-scroll>
    <AppDialog :show-dialog="dialogOption.show" :QRCode="QRCode" :show-close-btn="dialogOption.showClose" @close="closeItem"></AppDialog>
  </div>
</template>

<script>
import { getQRCode, userInviteInfo } from '@/api/djs/invite'
import AppDialog from '@/components/Dialog/QRCodeDialog'
import BScroll from '@/components/BScroll/BScroll'
import { mapGetters } from 'vuex'
export default {
  components: {
    AppDialog,
    BScroll
  },
  data() {
    return {
      dialogOption: {
        show: false,
        showTitle: false,
        showClose: false
      },
      QRCode: '',
      recommend: '', //我推荐的人数
      myInviteCode: '' //我的推荐码
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    // userInviteCode() {
    //   userInviteCode({ userName: this.user.userName }).then(res => {
    //     console.log(res)
    //   })
    // },
    showDetail() {
      // 去查看
      this.$router.push({
        name: 'DJSGratitudeMoney'
      })
    },
    scan() {
      // 面对面扫一扫
      getQRCode({
        userName: this.user.userName
      }).then(res => {
        // console.log(res.data)
        this.QRCode = res.data.qrPicUrl
        this.dialogOption.show = true
      })
    },
    closeItem() {
      this.dialogOption.show = false
    }
  },
  mounted() {
    // this.userInviteCode()
    userInviteInfo({ userName: this.user.userName }).then(res => {
      let data = res.data
      this.myInviteCode = data.myInviteCode
      this.recommend = data.inviteNum
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  background: #321ed1;
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    > div {
      padding-bottom: 0.3rem;
      .image {
        height: 2.66rem;
      }
      .information {
        background: #1e11ad;
        border: 0.03rem solid #715fff;
        box-shadow: inset 0 0 0.15rem 0 rgba(9, 0, 113, 0.6);
        border-radius: 0.08rem;
        width: 3.45rem;
        height: 1.61rem;
        margin: 0.08rem auto 0;
        .information_top {
          padding-top: 0.24rem;
          display: flex;
          justify-content: center;
          .information_p {
            text-align: center;
            .information_txt {
              display: block;
              font-size: 0.15rem;
              color: #ffffff;
              letter-spacing: 0;
            }
            .information_number {
              display: block;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 1rem;
              width: 0.88rem;
              height: 0.3rem;
              margin: 0 auto;
              margin-top: 0.08rem;
              line-height: 0.3rem;
              font-size: 0.17rem;
              color: #ffc107;
              letter-spacing: 0;
              text-align: center;
            }
          }
        }
        .go_look {
          width: 1.81rem;
          height: 0.45rem;
          margin: 0.21rem auto 0.15rem;
          img {
            width: 100%;
          }
        }
      }
      .recommendation_code {
        background: #1e11ad;
        border: 0.03rem solid #715fff;
        box-shadow: inset 0 0 0.15rem 0 rgba(9, 0, 113, 0.6);
        border-radius: 0.08rem;
        width: 3.45rem;
        height: 0.64rem;
        line-height: 0.64rem;
        margin: 0.08rem auto 0.09rem;
        padding-left: 0.24rem;
        font-size: 0.2rem;
        color: #ffffff;
        .txt {
          letter-spacing: -0.48px;
        }
        .number {
          letter-spacing: 0.02rem;
          margin-left: 0.08rem;
        }
      }
      .btns {
        width: 3.48rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .btn {
          margin: 0 auto;
          background: #321ed1;
          display: block;
          width: 1.62rem;
          height: 0.51rem;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
