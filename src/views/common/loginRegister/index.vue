<template>
  <div class="home pageContainer" ref="container">
    <div class="login-form">
      <header class="logo"></header>
      <h6 class="slogan">唯有赚钱不能停</h6>
      <input type="tel" maxlength="11" autofocus="autofocus" placeholder="请输入您的手机号" v-model="mobile" />
      <input type="button" :disabled="mobile.length < 11" @click="checkTelNum" value="下一步" />
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { isMobile } from '@/assets/js/regular'
import { isExistUser } from '@/api/common/register'
import { mapMutations } from 'vuex'
import Cookie from 'js-cookie'

export default {
  name: 'home',
  data() {
    return {
      title: '汇有财',
      isAppTitle: this.$route.query.mobile,
      mobile: '',
      mediasource: Cookie.get('app-invite-code') // 推荐码参数
    }
  },
  methods: {
    checkTelNum() {
      if (!this.mobile) {
        Toast('请输入手机号')
      } else if (!isMobile(this.mobile)) {
        Toast('请输入正确的手机号')
      } else {
        isExistUser({ mobile: this.mobile }).then(res => {
          if (res.data.data.isExistUser === '1') {
            // 该手机号已注册跳转登录
            this.setRegisterMobile(this.mobile)
            this.$router.push({ name: 'userLogin' })
          } else {
            // 新手机号跳转注册
            this.setRegisterMobile(this.mobile)
            this.$router.push({
              name: 'userRegister',
              query: { mediasource: this.mediasource }
            })
          }
        })
      }
    },
    ...mapMutations({
      setRegisterMobile: 'SET_REGISTER_MOBILE'
    })
  },
  created() {
    this.$nextTick(() => {
      if (this.isAppTitle) {
        this.$refs.container.style.top = '0'
      }
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      switch (from.name) {
        case 'DJSUserCenter':
          vm.$route.meta.backTo = 'DJSHomePage'
          break
        case 'HYCUserCenter':
          vm.$route.meta.backTo = 'HYCHomePage'
          break
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.pageContainer {
  width: 100%;
  /*
    这一页有导航条，$navBarHeight: 0;
    没有导航条，$navBarHeight: 0.44rem
   */
  // $navBarHeight: 0.44rem;
  $navBarHeight: 0;
  box-sizing: border-box;
  &.home {
    padding-top: 0.2rem + $navBarHeight;
    background: #fff;
    height: auto;
    .login-form {
      .logo {
        @include cube(1.36rem, 0.45rem);
        margin: 0 auto;
        @include bg-image(Hyoucai_logo);
        background-size: contain;
      }
      .slogan {
        position: relative;
        font-size: 0.15rem;
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
        margin: 0.07rem auto 0.5rem;
        &:before,
        &:after {
          content: '';
          position: absolute;
          width: 0.7em;
          height: 1px;
          background: rgba(0, 0, 0, 0.5);
          top: 50%;
          left: 50%;
          margin-left: -0.7rem;
        }
        &:after {
          margin-left: 0.6rem;
        }
      }
      input {
        margin: 0 auto 0.34rem;
        display: block;
        width: 3.45rem;
        height: 0.45rem;
        font-size: 0.13rem;
        color: #999999;
        &[type='tel'] {
          border-bottom: 0.01rem solid #f4f4f4;
        }
        &[type='button'] {
          margin: 0 auto;
          display: block;
          width: 3.45rem;
          height: 0.45rem;
          border-radius: 0.04rem;
          background: $color-main;
          font-size: 0.15rem;
          color: #ffffff;
          border-bottom: 0.01rem solid #f4f4f4;
          &:disabled {
            background: #ccc;
          }
        }
      }
    }
  }
}
</style>
