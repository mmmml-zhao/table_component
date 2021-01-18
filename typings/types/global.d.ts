declare namespace GlobalData {

  // 小程序事件对象
  interface WxAppletsEvent {
    detail: {
      value: any,
      current: number,
      source: string,
      [key: string]: any
    },
    traget: {
      dataset: {
        [key: string]: any
      }
    },
    currentTarget: {
      dataset: {
        [key: string]: any
      }
    },
    type: string
  }

  // 全局屏幕
  interface PageConfig {
    pixelRate: number,//px与rpx换算关系
    platform: string,//操作平台 用于适配胶囊高度
    capsuleHeight: number,//胶囊高度
    statusBarHeight: number,//手机顶部状态栏高度
    titleHeight: number,//整个导航头高度
    systemHeight: number,//手机屏幕高度
    isAllScreen: boolean,//是否是全面屏手机
    isHighHead: boolean,//是否是刘海屏手机
    phoneSystem: 'ios' | 'android' | undefined // 系统类型
  }

  // 转发
  interface Transmit {
    title?: string,
    path?: string,
    imageUrl: string,
    success: (res: any) => void,
    fail: (res: any) => void,
  }

  // 全局的globalData参数设置
  interface GlobalData {
    pageConfig: PageConfig,
    transmit: Transmit
  }

}

// 初始化lodash 需要使用global
declare const global: any
