import Layout from '@/layout/layout.vue'
import Empty from '@/layout/empty.vue'

export default [
  {
    path: '/d',
    component: Layout,
    children: [
      {
        path: 'investdetail',
        name: 'DJSInvestDetail',
        component: () => import(/* webpackChunkName: "DJSInvestDetail" */ '@/views/djs/investDetail'),
        meta: {
          title: '产品详情'
        }
      },
      {
        path: 'easyLend',
        component: Empty,
        children: [
          {
            path: '',
            name: 'DJSEasyLend',
            component: () => import(/* webpackChunkName: "DJSInvestDetail" */ '@/views/djs/investDetail/easyLend'),
            meta: {
              title: '授权出借'
            }
          },
          {
            path: 'coupon',
            name: 'DJSLendChooseCoupon',
            component: () => import('@/views/djs/investDetail/coupon'),
            meta: {
              title: '选择加息券'
            }
          },
          {
            path: 'redpacket',
            name: 'DJSLendChooseRedPacket',
            component: () => import('@/views/djs/investDetail/redpacket'),
            meta: {
              title: '选择红包'
            }
          }
        ]
      },
      {
        path: 'claimlist',
        name: 'DJSClaimList',
        component: () => import(/* webpackChunkName: "DJSClaimList" */ '@/views/djs/claim/claimList'),
        meta: {
          title: '债权列表'
        }
      },
      {
        path: 'claimDetail',
        name: 'DJSClaimDetail',
        component: () => import(/* webpackChunkName: "DJSClaimList" */ '@/views/djs/claim/claimDetail'),
        meta: {
          title: '债权列表详情'
        }
      },
      {
        path: 'lendRecord',
        name: 'DJSLendRecord',
        component: () => import(/* webpackChunkName: "DJSClaimList" */ '@/views/djs/lendRecord'),
        meta: {
          title: '出借记录'
        }
      },
      {
        path: 'act-center',
        name: 'DJSActivityCenter',
        component: () => import(/* webpackChunkName: "DJSActivityCenter" */ '@/views/djs/ActivityCenter/ActivityCenter'),
        meta: {
          title: '活动中心'
        }
      },
      {
        path: 'agreement',
        name: 'DJSagreement',
        component: () => import(/* webpackChunkName: "DJSagreement" */ '@/views/djs/Agreements'),
        meta: {
          title: '协议'
        }
      },
      {
        path: 'gratitude_money',
        name: 'DJSGratitudeMoney',
        component: () => import(/* webpackChunkName: "DJSGratitudeMoney" */ '@/views/djs/GratitudeMoney'),
        meta: {
          title: '我推荐的人'
        }
      },
      {
        path: 'inviteFriends',
        name: 'DJSInviteFriends',
        component: () => import(/* webpackChunkName: "DJSinviteFriends" */ '@/views/djs/mine/Invite/InviteFriends'),
        meta: {
          title: '邀请好友'
        }
      },
      {
        path: 'recommender',
        name: 'DJSRecommender',
        component: () => import(/* webpackChunkName: "DJSRecommender" */ '@/views/djs/mine/Invite/Recommender'),
        meta: {
          title: '我的推荐人'
        }
      },
      {
        path: 'transfer_charge',
        name: 'DJSTransferCharge',
        component: () => import(/* webpackChunkName: "DJSTransferCharge" */ '@/views/djs/TransferCharge'),
        meta: {
          title: '转账充值'
        }
      },
      {
        path: 'notice',
        component: Empty,
        children: [
          {
            path: '',
            name: 'DJSNoticeList',
            component: () => import(/* webpackChunkName: "DJSNoticeDetail" */ '@/views/djs/notice/list'),
            meta: {
              title: '网站公告'
            }
          },
          {
            path: ':id',
            name: 'DJSNoticeDetail',
            component: () => import(/* webpackChunkName: "DJSNoticeDetail" */ '@/views/djs/notice/detail'),
            meta: {
              title: '公告详情'
            }
          }
        ]
      },
      {
        path: 'calculator',
        name: 'DJSCalculator',
        component: () => import(/* webpackChunkName: "DJSCalculator" */ '@/views/djs/calculator'),
        meta: {
          title: '理财计算器'
        }
      },
      {
        path: 'newer_direction',
        name: 'DJSNewerDirection',
        component: () => import(/* webpackChunkName: "DJSNewerDirection" */ '@/views/djs/NewerDirection'),
        meta: {
          title: '新手指引'
        }
      },
      {
        path: 'historyCard',
        name: 'DJSHistoryCard',
        component: () => import(/* webpackChunkName: "DJShistoryCard" */ '@/views/djs/mine/voucherBag/HistoryCard'),
        meta: {
          title: '历史卡券'
        }
      },
      {
        path: 'couponList',
        name: 'DJSCouponList',
        component: () => import(/* webpackChunkName: "DJScouponList" */ '@/views/djs/mine/voucherBag/CouponList'),
        meta: {
          title: '券包'
        }
      },
      {
        path: 'experienceGold',
        name: 'DJSExperienceGold',
        component: () => import(/* webpackChunkName: "DJSExperienceGold" */ '@/views/djs/mine/voucherBag/ExperienceGold'),
        meta: {
          title: '体验金'
        }
      },
      {
        path: 'transactionRecord',
        name: 'DJSTransactionRecord',
        component: () => import(/* webpackChunkName: "DJSTransactionRecord" */ '@/views/djs/mine/TransactionRecord'),
        meta: {
          title: '交易记录'
        }
      },
      {
        path: 'message',
        name: 'DJSSiteMessage',
        component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/message'),
        meta: {
          title: '消息'
        }
      },
      {
        path: 'couponMsg',
        name: 'CouponMsg',
        component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/couponMsg'),
        meta: {
          title: '加息券消息'
        }
      },
      {
        path: 'couponMsgDetail',
        name: 'CouponMsgDetail',
        component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/couponMsgDetail'),
        meta: {
          title: '加息券消息'
        }
      },
      {
        path: 'redMsg',
        name: 'RedMsg',
        component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/redMsg'),
        meta: {
          title: '红包消息'
        }
      },
      {
        path: 'redMsgDetail',
        name: 'RedMsgDetail',
        component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/redMsgDetail'),
        meta: {
          title: '红包消息'
        }
      },
      {
        path: 'repeatMsg',
        name: 'RepeatMsg',
        component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/repeatMsg'),
        meta: {
          title: '复投提醒消息'
        }
      },
      {
        path: 'repeatMsgDetail',
        name: 'RepeatMsgDetail',
        component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/repeatMsgDetail'),
        meta: {
          title: '复投消息'
        }
      },
      {
        path: 'experienceMsg',
        name: 'ExperienceMsg',
        component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/experienceMsg'),
        meta: {
          title: '体验金消息'
        }
      },
      {
        path: 'experienceMsgDetail',
        name: 'ExperienceMsgDetail',
        component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/experienceMsgDetail'),
        meta: {
          title: '体验金消息'
        }
      },
      {
        path: 'charge',
        name: 'DJSCharge',
        component: () => import(/* webpackChunkName: "DJSCharge" */ '@/views/djs/mine/charge/charge'),
        meta: {
          title: '充值',
          cancel: '取消'
        }
      },
      {
        path: 'bank-card',
        name: 'DJSBankCard',
        component: () => import(/* webpackChunkName: "DJSBankCard" */ '@/views/djs/mine/bankCard/bankCard'),
        meta: {
          title: '银行卡'
        }
      },
      {
        path: 'to-cash',
        name: 'DJSToCash',
        component: () => import(/* webpackChunkName: "DJSToCash" */ '@/views/djs/mine/toCash/toCash'),
        meta: {
          title: '提现'
        }
      }
    ]
  },
  {
    path: '/h',
    component: Layout,
    children: [
      // 活动列表
      {
        path: 'act-center',
        name: 'HYCActivityCenter',
        component: () => import(/* webpackChunkName: "HYCActivityCenter" */ '@/views/hyc/ActivityCenter/ActivityCenter'),
        meta: {
          title: '活动中心'
        }
      },
      // 协议
      {
        path: 'agreement',
        name: 'HYCagreement',
        component: () => import(/* webpackChunkName: "HYCagreement" */ '@/views/hyc/Agreements'),
        meta: {
          title: '协议'
        }
      },
      {
        path: 'gratitude_money',
        name: 'HYCGratitudeMoney',
        component: () => import(/* webpackChunkName: "HYCGratitudeMoney" */ '@/views/hyc/GratitudeMoney'),
        meta: {
          title: '我推荐的人'
        }
      },
      {
        path: 'inviteFriends',
        name: 'HYCInviteFriends',
        component: () => import(/* webpackChunkName: "HYCInviteFriends" */ '@/views/hyc/mine/Invite/InviteFriends'),
        meta: {
          title: '邀请好友'
        }
      },
      {
        path: 'recommender',
        name: 'HYCRecommender',
        component: () => import(/* webpackChunkName: "HYCRecommender" */ '@/views/hyc/mine/Invite/Recommender'),
        meta: {
          title: '我的推荐人'
        }
      },
      {
        path: 'transfer_charge',
        name: 'HYCTransferCharge',
        component: () => import(/* webpackChunkName: "HYCTransferCharge" */ '@/views/hyc/TransferCharge'),
        meta: {
          title: '转账充值'
        }
      },
      {
        path: 'notice',
        component: Empty,
        children: [
          {
            path: '',
            name: 'HYCNoticeList',
            component: () => import(/* webpackChunkName: "HYCNoticeDetail" */ '@/views/hyc/notice/list'),
            meta: {
              title: '公告'
            }
          },
          {
            path: ':id',
            name: 'HYCNoticeDetail',
            component: () => import(/* webpackChunkName: "HYCNoticeDetail" */ '@/views/hyc/notice/detail'),
            meta: {
              title: '公告'
            }
          }
        ]
      },
      {
        path: 'calculator',
        name: 'HYCCalculator',
        component: () => import(/* webpackChunkName: "HYCCalculator" */ '@/views/hyc/calculator'),
        meta: {
          title: '理财计算器'
        }
      },
      {
        path: 'newer_direction',
        name: 'HYCNewerDirection',
        component: () => import(/* webpackChunkName: "HYCNewerDirection" */ '@/views/hyc/NewerDirection'),
        meta: {
          title: '新手指引'
        }
      },
      {
        path: 'transactionRecord',
        name: 'HYCTransactionRecord',
        component: () => import(/* webpackChunkName: "HYCTransactionRecord" */ '@/views/hyc/mine/TransactionRecord'),
        meta: {
          title: '交易记录'
        }
      },
      {
        path: 'message',
        name: 'HYCSiteMessage',
        component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/hyc/message'),
        meta: {
          title: '消息'
        }
      },
      {
        path: 'charge',
        name: 'HYCCharge',
        component: () => import(/* webpackChunkName: "HYCCharge" */ '@/views/hyc/mine/charge/charge'),
        meta: {
          title: '充值'
        }
      },
      {
        path: 'bank-card',
        name: 'HYCBankCard',
        component: () => import(/* webpackChunkName: "HYCBankCard" */ '@/views/hyc/mine/bankCard/bankCard'),
        meta: {
          title: '银行卡'
        }
      },
      {
        path: 'to-cash',
        name: 'HYCToCash',
        component: () => import(/* webpackChunkName: "HYCToCash" */ '@/views/hyc/mine/toCash/toCash'),
        meta: {
          title: '提现'
        }
      },
      {
        path: 'investDetail',
        name: 'HYCInvestDetail',
        component: () => import(/* webpackChunkName: "HYCToCash" */ '@/views/hyc/investDetail'),
        meta: {
          title: '产品详情'
        }
      },
      {
        path: 'easyLend',
        component: Empty,
        children: [
          {
            path: '',
            name: 'HYCEasyLend',
            component: () => import(/* webpackChunkName: "DJSInvestDetail" */ '@/views/hyc/investDetail/easyLend'),
            meta: {
              title: '授权出借'
            }
          },
          {
            path: 'coupon',
            name: 'HYCLendChooseCoupon',
            component: () => import('@/views/hyc/investDetail/coupon'),
            meta: {
              title: '选择加息券'
            }
          },
          {
            path: 'redpacket',
            name: 'HYCLendChooseRedPacket',
            component: () => import('@/views/hyc/investDetail/redpacket'),
            meta: {
              title: '选择红包'
            }
          }
        ]
      },
      {
        path: 'claimList',
        name: 'HYCClaimList',
        component: () => import(/* webpackChunkName: "HYCToCash" */ '@/views/hyc/claim/claimList'),
        meta: {
          title: '债权列表'
        }
      },
      {
        path: 'claimDetail',
        name: 'HYCClaimDetail',
        component: () => import(/* webpackChunkName: "HYCToCash" */ '@/views/hyc/claim/claimDetail'),
        meta: {
          title: '债权详情'
        }
      }
    ]
  }
]
