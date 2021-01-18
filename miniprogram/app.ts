import { setNavStyle } from './public/utils/util'
// app.ts
App<IAppOption>({
  onLaunch() {

  },
  globalData: {
    pageConfig: setNavStyle(),
    transmit: {
      title: '小程序table组件',
      path: '/pages/index/index',
      imageUrl: '',
      success: function (res: any) {
        console.log(res)
      },
      fail: function (res: any) {
        console.log(res)
      }
    }
  },
})