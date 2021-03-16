

// 获取应用实例
const app = getApp<IAppOption>()
type InitData = {
}

type InitProperty = {
  item: WechatMiniprogram.Component.FullProperty<ObjectConstructor>,
  index: WechatMiniprogram.Component.FullProperty<NumberConstructor>,
  columns: WechatMiniprogram.Component.FullProperty<ObjectConstructor>,
}

type InitMethod = {
  handleClickItem(e: GlobalData.WxAppletsEvent): void
}

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
    },
    columns: {
      type: Object,
      value: {}
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickItem(e) {
      const { type } = e.currentTarget.dataset
      const { index, item } = this.data
      this.triggerEvent('clickaction', {
        value: {
          type,
          index, item
        }
      })
      this.triggerEvent('onactionevent', {
        value: {
          type,
          index, item
        }
      })
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () { },
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