import Activity from '@/layout/activity.vue'
import Empty from '@/layout/empty.vue'

const router = [
  // 两端通用活动
  {
    path: '/activity',
    component: Activity,
    children: [
      {
        path: 'prizeDraw',
        name: 'prizeDraw',
        component: () => import(/* webpackChunkName: "prizeDraw" */ '@/views/common/activities/prizeDraw')
      },
      {
        path: 'spellTeam',
        name: 'spellTeam',
        component: () => import(/* webpackChunkName: "spellTeam" */ '@/views/common/activities/spellTeam')
      },
      {
        path: 'king', // 6月王者加息券
        name: 'DJSKingJune',
        component: () => import(/* webpackChunkName: "DJSKingJune" */ '@/views/common/activities/king')
      },
      {
        path: 'sign-in', // 签到活动
        name: 'DJSSignIn',
        component: () => import(/* webpackChunkName: "DJSSignIn" */ '@/views/common/activities/signIn')
      },
      {
        path: 'July-act', // 七月加息券活动
        name: 'JulyAct',
        component: () => import(/* webpackChunkName: "JulyAct" */ '@/views/common/activities/JulyAct')
      }
    ]
  },
  // 点金石活动
  {
    path: '/d',
    component: Activity,
    children: [
      {
        path: 'activity',
        component: Empty,
        children: [
          {
            path: 'mateact',
            name: 'DJSmateAct',
            component: () => import(/* webpackChunkName: "DJSMateAct" */ '@/views/djs/activities/mateact/mateact')
          },
          {
            path: 'coupon',
            name: 'DJScoupon',
            component: () => import(/* webpackChunkName: "DJSCouponAct" */ '@/views/djs/activities/coupon/index')
          },
          {
            path: 'gold',
            name: 'DJSGold',
            component: () => import(/* webpackChunkName: "DJSGoldAct" */ '@/views/djs/activities/goldact')
          },
          {
            path: 'register',
            name: 'DJSRegister',
            component: () => import(/* webpackChunkName: "DJSRegisterAct" */ '@/views/djs/activities/register')
          },
          {
            path: 'womensday',
            name: 'womensDay',
            component: () => import(/* webpackChunkName: "womenDayAct" */ '@/views/djs/activities/womensDay/index')
          },
          {
            path: 'inviteact',
            name: 'DJSinviteAct',
            component: () => import(/* webpackChunkName: "DJSInviteAct" */ '@/views/djs/activities/inviteact')
          },
          {
            path: 'yearact',
            name: 'DJSyearAct',
            component: () => import(/* webpackChunkName: "DJSYearAct" */ '@/views/djs/activities/yearact')
          },
          {
            path: 'yearact_2',
            name: 'DJSyearAct_2',
            component: () => import(/* webpackChunkName: "DJSYearAct_2" */ '@/views/djs/activities/yearact_2')
          },
          {
            path: '3000',
            name: 'DJS3000Act',
            component: () => import(/* webpackChunkName: "DJS3000Act" */ '@/views/djs/activities/3000')
          },
          {
            path: 'spell-group',
            name: 'DJSSpellGroupAct',
            component: () => import(/* webpackChunkName: "DJSSpellGroupAct" */ '@/views/djs/activities/spellGroup')
          },
          {
            path: 'king',
            name: 'DJSKing',
            component: () => import(/* webpackChunkName: "DJSKing" */ '@/views/djs/activities/king')
          },
          {
            path: 'may-recommend',
            name: 'DJSMayRecommend',
            component: () => import(/* webpackChunkName: "DJSMayRecommend" */ '@/views/djs/activities/mayRecommend')
          }
        ]
      }
    ]
  },
  //汇有财活动
  {
    path: '/h',
    component: Activity,
    children: [
      {
        path: 'activity',
        component: Empty,
        children: [
          {
            path: 'mateact',
            name: 'HYCmateAct',
            component: () => import(/* webpackChunkName: "HYCMateAct" */ '@/views/hyc/activities/mateact/mateact')
          },
          {
            path: 'anni-cashback',
            name: 'sixthAnniCashback',
            component: () => import(/* webpackChunkName: "sixthAnniCashBack" */ '@/views/hyc/activities/sixthAnniversary/index')
          }
        ]
      }
    ]
  }
]

export default router
