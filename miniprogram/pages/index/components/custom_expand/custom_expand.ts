import { Columns } from '../../../../public/components/public/table/data'
import { DataListItem } from '../../data'
import { mockData } from '../../../../public/utils/util'

// 获取应用实例
const app = getApp<IAppOption>()

type InitData = {
  dataList: DataListItem[],
  tableColumns: Columns[],
  pageNum: number,// 分页
  pageSize: number, // 单页数量 
  pageCount: number,// 总页数
  getListLoading: boolean,
  tableScrollViewHeight: string,
}

type InitProperty = {
  detail: WechatMiniprogram.Component.FullProperty<ObjectConstructor>
}

type InitMethod = {
  options: any
  handleClickExpand(e: GlobalData.WxAppletsEvent): void,
  getList(): void,
  getTableScrollViewHeight(): void
  initComponent(): void
}



Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    detail: {
      type: Object,
      value: {}
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    tableColumns: [{
      title: "姓名",
      key: "name",
    }, {
      title: "年龄",
      key: "age",
    }, {
      title: "性别",
      key: "sex",
    }],// table 表头参数
    dataList: [],// 学校数组
    pageNum: 1,
    pageSize: 10,
    pageCount: 1,
    getListLoading: false,
    tableScrollViewHeight: '800rpx',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    options: {},
    // 点击table的action区域
    handleClickExpand(e) {
      console.log(e)
      let str: string = ''
      const { type, index, item } = e.detail.value
      if (type === 'name') {
        str = '点击了姓名'
      } else if (type === 'age') {
        str = '点击了年龄'
      } else if (type === 'sex') {
        str = '点击了性别'
      }
      wx.showToast({
        title: str
      })
    },
    // 获取列表
    async getList() {
      try {
        const { pageNum, pageSize, pageCount, dataList, getListLoading } = this.data
        if (pageNum > pageCount) return
        if (getListLoading) return
        this.setData({
          getListLoading: true,
        })
        const res = await mockData<DataListItem>('list', {
          id: 1,
          name: '兼职人员',
          age: 10,
          sex: '男',
        }, "name", pageNum, pageSize)
        this.setData({
          dataList: dataList.concat(res.data.list.map((item, index) => ({
            ...item,
            exoand_value: index === 0 ? '' : `这是第${((pageNum - 1) * pageSize) + index + 1}条`
          }))),
          pageCount: res.data.pageCount,
          getListLoading: false,
          pageNum: res.data.list.length > 0 ? pageNum + 1 : pageNum,
        })
      } catch (e) {
        this.setData({
          getListLoading: false,
        })
        console.log(e)
      }
    },
    getTableScrollViewHeight() {
      // const pageConfig = wx.
      const node = this.createSelectorQuery().select('.basic-table >>> .tr-th')
      const { pageConfig } = app.globalData
      node.boundingClientRect((rect) => {
        this.setData({
          tableScrollViewHeight: rect ? `calc(100vh - ${600 + rect.height / pageConfig.pixelRate}rpx)` : ''
        })
      }).exec()
    },
    initComponent() {
      this.getList()
      this.getTableScrollViewHeight()
    },
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () { this.initComponent() },
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