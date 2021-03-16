
// 获取应用实例
type InitData = {
  expandAimation: WechatMiniprogram.Animation | null,
  expandAimationData: WechatMiniprogram.AnimationExportResult | null,
  expanded: boolean,
}

type InitProperty = {
  rowKey: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  columns: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  item: WechatMiniprogram.Component.FullProperty<ObjectConstructor>,
  index: WechatMiniprogram.Component.FullProperty<NumberConstructor>,
  select: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  scrollX: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  checked: WechatMiniprogram.Component.FullProperty<BooleanConstructor>
  isExpand: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  expandValueKey: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  initExpandValue: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  expandStyle: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  dynamicValue: WechatMiniprogram.Component.FullProperty<ObjectConstructor>,
}

type InitMethod = {
  handleClickListItem(e: GlobalData.WxAppletsEvent): void,
  handleClickAction(e: GlobalData.WxAppletsEvent): void,
  handleOnActionEvent(e: GlobalData.WxAppletsEvent): void,
  handleClickExpand(e: GlobalData.WxAppletsEvent): void,
  handleClickCheck(e: GlobalData.WxAppletsEvent): void,
  setExpand(): void,
  initAnimate(): void
}

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    rowKey: {
      type: String,
      value: 'id'
    }, // 指明datalist里item的哪一项可以用作是key
    columns: {
      type: Array,
      value: []
    }, // 表头
    item: {
      type: Object,
      value: {}
    }, // 数据
    index: {
      type: Number,
    },// 当前数据的序号
    select: {
      type: Boolean,
      value: false
    }, // 是否开启勾选
    scrollX: {
      type: Boolean,
      value: false
    }, // 是否开启勾选
    checked: {
      type: Boolean,
      value: false
    }, // 勾选的初始rowKey列表
    isExpand: {
      type: Boolean,
      value: false
    },// 是否需要展开
    expandValueKey: {
      type: String,
    },// 展开的内容的key
    initExpandValue: {
      type: String,
      value: '暂无信息'
    },// 无展开内容的显示文本
    expandStyle: {
      type: String,
    },// 展开区域的样式字符串
    dynamicValue: {
      type: Object,
      optionalTypes: [Array, String, Number, Boolean, null]
    },// 给action-td传动态值
  },

  /**
   * 组件的初始数据
   */
  data: {
    expandAimation: null,// expand展开动画
    expandAimationData: null,// expand展开动画
    expanded: false // 是否已经展开
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击表格中一项触发
    handleClickListItem(e) {
      const { index } = e.currentTarget.dataset
      this.setExpand()
      this.triggerEvent('clicklistitem', {
        value: {
          index,
          item: e.currentTarget.dataset.item
        }
      })
    },
    // 如果有action 里面有点击事件 触发该事件
    handleClickAction(e) {
      this.triggerEvent('clickaction', {
        value: e.detail.value
      })
    },
    // 如果有action 里面有对数据的操作 触发该事件
    handleOnActionEvent(e) {
      this.triggerEvent('onactionevent', {
        value: e.detail.value
      })
    },
    // 如果有expand 里面有点击事件 怎触发该事件
    handleClickExpand(e) {
      this.triggerEvent('clickexpand', {
        value: e.detail.value
      })
    },
    handleClickCheck(e) {
      const { item } = e.currentTarget.dataset
      const { index } = this.data
      this.triggerEvent('checkkey', {
        value: {
          item,
          index
        }
      })
    },
    // 设置额外信息展开
    setExpand() {
      const { isExpand, expanded, expandAimation } = this.data
      if (isExpand && expandAimation) {
        if (expanded) {
          expandAimation.opacity(0).height(0).step()
        } else {
          expandAimation.opacity(1).height('auto').step()
        }
        this.setData({
          expandAimationData: expandAimation.export(),
          expanded: !expanded
        })
      }
    },

    // 初始化动画
    initAnimate() {
      const { isExpand } = this.data
      if (!isExpand) return
      // 展开行动画初始化
      const expandAimation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      this.data.expandAimation = expandAimation
    },
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () {
      this.initAnimate()
    },
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