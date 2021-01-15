// 获取应用实例
const app = getApp<IAppOption>()
type InitData = {
}

type InitProperty = {}

type InitMethod = {
  onLoad(options: any): void
  onShow(): void
  onReady(): void
  onShareAppMessage(): void
}

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  computed: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options: any) {
      console.log(options)
    },
    onShow() {
      console.log('onShow')
    },
    onReady() {
      console.log('onReady')
    },
    onShareAppMessage() {
      return app.globalData.transmit
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

})

export { }