const getNowPage = () => {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

function debounce(fun: (...args: any) => void, delay: number) {
  let timer: number | null = null
  return function (this: WechatMiniprogram.Component.Instance<InitData, InitProperty, InitMethod, {}, false>, ...args: any) {
    let _this = this
    let _args = args
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fun.call(_this, ..._args)
    }, delay)
  }
}

type InitData = {
  tableScrollViewHeight: string
  scrollTop: number,
  scrollLeftHeader: number,
  scrollLeftContent: number,
  scrollTag: 'content' | 'header' | null,
  touchStatus: 'start' | 'end'
  checkObj: {
    [key: string]: boolean,
  } // 用于存储勾选信息
}

type InitProperty = {
  rowKey: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  tableHeight: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  scrollX: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  columns: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  dataList: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  getListLoading: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  showTipImage: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  tipTitle: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  tipSubtitle: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  select: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  selectKeys: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  isExpand: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  expandValueKey: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  initExpandValue: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  expandStyle: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  dynamicValue: WechatMiniprogram.Component.FullProperty<ObjectConstructor>,
}

type InitMethod = {
  createShowDataList(): void
  setScrollTop(): void,
  setScrollLeft(e: GlobalData.WxAppletsEvent): void,
  clearScrollTag(e: GlobalData.WxAppletsEvent): void,
  handleScroll(e: GlobalData.WxAppletsEvent): void
  handleTouchStart(e: GlobalData.WxAppletsEvent): void
  handleTouchEnd(e: GlobalData.WxAppletsEvent): void
  handleScrolltolower(): void,
  handleScrolltoupper(): void,
  handleClickListItem(e: GlobalData.WxAppletsEvent): void,
  handleClickAction(e: GlobalData.WxAppletsEvent): void,
  handleOnActionEvent(e: GlobalData.WxAppletsEvent): void,
  handleClickExpand(e: GlobalData.WxAppletsEvent): void,
  handleClickCheck(e: GlobalData.WxAppletsEvent): void
  getTableScrollViewHeight(): void,
  tipFc(): void
}

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    rowKey: {
      type: String,
      value: 'id'
    }, // 指明datalist里item的哪一项可以用作是key
    tableHeight: {
      type: String,
      value: '600rpx',
    }, // 表格高度
    scrollX: {
      type: Boolean,
      value: false
    }, // 指明datalist里item的哪一项可以用作是key
    columns: {
      type: Array,
      value: []
    }, // 表头
    dataList: {
      type: Array,
      value: []
    }, // 数据
    getListLoading: {
      type: Boolean,
      value: false
    }, // 数据请求
    showTipImage: {
      type: Boolean,
      value: false
    }, // 是否出现提示块
    tipTitle: {
      type: String,
      value: '提示'
    },// 提示块内的标题文字
    tipSubtitle: {
      type: String,
      value: '暂无数据'
    },// 提示块内的副标题文字
    select: {
      type: Boolean,
      value: false
    }, // 是否开启勾选
    selectKeys: {
      type: Array,
      value: []
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
    },// 展开内容为空时 显示的文字
    expandStyle: {
      type: String,
    },// 展开信息的div的样式
    dynamicValue: {
      type: Object,
      optionalTypes: [Array, String, Number, Boolean, null],
      value: {}
    },// 给action-td/expand-component传动态值
  },
  /**
   * 组件的初始数据
   */
  data: {
    tableScrollViewHeight: '0rpx',//表格滚动区域高度
    scrollTop: 0,// 设置回到顶部
    scrollLeftHeader: 0,
    scrollLeftContent: 0,
    scrollTag: null,
    touchStatus: 'end',
    checkObj: {},// 勾选的项的存储对象
  },
  observers: {
    'dataList': function (dataList: any[]) {
      if (dataList && dataList.length > 0) {
        this.createShowDataList()
      } else {
        this.setScrollTop()
      }
    },
    // selectKeys用于初始化勾选 每次改变都会更新勾选
    'selectKeys': function (selectKeys: any[]) {
      const newCheckObj: { [key: string]: boolean } = {}
      selectKeys.forEach(item => {
        newCheckObj[item] = true
      })
      this.setData({
        checkObj: newCheckObj
      })
    },
    // 当表格高度修改，则修改滚动区域高度
    'tableHeight': function () {
      this.getTableScrollViewHeight()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 创建展示列表
    createShowDataList() {
      const { columns, dataList, rowKey } = this.data
      const needReaderColums = columns.filter(item => item.render)
      this.setData({
        showDataList: dataList.map((item, index) => {
          let newItem = { ...item, row_key: `${item[rowKey]}` }
          needReaderColums.forEach((item1) => {
            newItem[item1.key] = item1.render(newItem[item1.key], item, index, getNowPage().data)
          })
          return newItem
        })
      })
    },
    // 设置当列表清空 滚回顶部
    setScrollTop() {
      this.setData({
        scrollTop: 0
      })
    },
    // 主要是为了监听横向滚动
    setScrollLeft(this: WechatMiniprogram.Component.Instance<InitData, InitProperty, InitMethod, {}, false>, e: GlobalData.WxAppletsEvent) {
      // console.log(`setScrollLeft`, e)
      const { tag } = e.currentTarget.dataset
      const { scrollLeft } = e.detail
      const { scrollTag } = this.data
      if (tag !== scrollTag) return
      if (tag === 'header') {
        this.setData({
          scrollLeftContent: scrollLeft
        })
      } else if (tag === 'content') {
        this.setData({
          scrollLeftHeader: scrollLeft
        })
      }
    },
    // 主要是为了监听横向滚动 当手指离开屏幕，处于最后的滑动时 触发防抖 监听最后一次清除滚动对象
    clearScrollTag: debounce(function (this: WechatMiniprogram.Component.Instance<InitData, InitProperty, InitMethod, {}, false>, e) {
      const { touchStatus } = this.data
      // 也许用户又开始下一次的滚动了 所以要清除这个命令 只有在用户手指离开屏幕才会清除滚动对象
      if (touchStatus === 'start') return
      this.setData({
        scrollTag: null
      })
    }, 100),
    // 主要是为了监听横向滚动
    handleScroll(e) {
      // console.log(`handleScroll`, e)
      const { scrollX, touchStatus } = this.data
      if (!scrollX) return
      this.setScrollLeft(e)
      if (touchStatus === 'end') {
        this.clearScrollTag(e)
      }
    },
    // 主要是为了监听横向滚动
    handleTouchStart(e) {
      const { scrollX, scrollTag, touchStatus } = this.data
      if (!scrollX) return
      if (scrollTag || touchStatus === 'start') return
      const { tag } = e.currentTarget.dataset
      this.setData({
        touchStatus: 'start',
        scrollTag: tag,
      })
    },
    // 主要是为了监听横向滚动
    handleTouchEnd(e) {
      // console.log(e)
      const { scrollX, scrollTag } = this.data
      if (!scrollX) return
      const { tag } = e.currentTarget.dataset
      if (tag !== scrollTag) return
      this.setData({
        touchStatus: 'end'
      })
    },
    // 滚动到底部触发
    handleScrolltolower() {
      const { showTipImage } = this.data
      if (showTipImage) return
      this.triggerEvent('scrolltolower')
    },
    // 滚动到顶部触发
    handleScrolltoupper() {
      this.triggerEvent('scrolltoupper')
    },
    // 点击表格中一项触发
    handleClickListItem(e) {
      this.triggerEvent('clicklistitem', {
        value: e.detail.value
      })
    },
    // 如果有action 里面有点击事件 怎触发该事件
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
    // 勾选事件 
    // 只记录勾选的rowKey 因为index和item在初始化的时候是无法获取的
    handleClickCheck(e) {
      const { item } = e.detail.value
      const { checkObj, rowKey } = this.data
      const newCheckObj = { ...checkObj }
      newCheckObj[item[rowKey]] = !newCheckObj[item[rowKey]]
      this.setData({
        checkObj: newCheckObj
      }, () => {
        const value = []
        for (let i in newCheckObj) {
          if (newCheckObj[i]) {
            value.push(i)
          }
        }
        this.triggerEvent('checkkey', {
          value
        })
      })
    },
    // 设置table高度
    getTableScrollViewHeight: function (this: WechatMiniprogram.Component.Instance<InitData, InitProperty, InitMethod, {}, false>) {
      try {
        const { tableHeight } = this.data
        const pageConfig = wx.getSystemInfoSync()
        const node = this.createSelectorQuery().select('.tr-th')
        node.boundingClientRect((rect) => {
          this.setData({
            tableScrollViewHeight: `calc(${tableHeight} - ${rect.height * pageConfig.pixelRatio}rpx)`
          })
        }).exec()
      } catch (e) {
        console.log(e)
      }
    },
    tipFc() {
      const { rowKey, columns } = this.data
      if (!rowKey) {
        console.error('table组件必须指明每一行的唯一标识的字段名，且必须为字符串，数字将会被转为字符串,for循环中的wx:key不使用该字段，用的是createShowDataList中设置的row_key字段')
      }
      if (!columns) {
        console.error('table组件必须指明columns')
      }
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.tipFc()
    },
    ready: function () {
      this.getTableScrollViewHeight()
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