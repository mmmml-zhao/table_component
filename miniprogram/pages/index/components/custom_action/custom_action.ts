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
}

type InitProperty = {
  detail: WechatMiniprogram.Component.FullProperty<ObjectConstructor>
}

type InitMethod = {
  options: any
  handleClickAction(e: GlobalData.WxAppletsEvent): void,
  getList(): void,
  reloadList(): void,
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
      type: "action"
    }, {
      title: "年龄",
      key: "age",
      type: "action"
    }, {
      title: "性别",
      key: "sex",
      type: "action"
    }],// table 表头参数
    dataList: [],// 学校数组
    pageNum: 1,
    pageSize: 10,
    pageCount: 1,
    getListLoading: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    options: {},
    // 点击table的action区域
    handleClickAction(e) {
      console.log(e)
      let str: string = ''
      const { type, index, item } = e.detail.value
      if (type === 'name') {
        str = `第${index + 1}行姓名字段`
      } else if (type === 'age') {
        str = `第${index + 1}行年龄字段`
      } else if (type === 'sex') {
        str = `第${index + 1}行性别字段`
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
          dataList: dataList.concat(res.data.list),
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
    //  条件变化就会触发
    reloadList() {
      this.setData({
        pageNum: 1, // 单页数量 
        pageCount: 1,// 总页数
        dataList: [],
      }, () => {
        this.getList()
      })
    },
    initComponent() {
      this.getList()
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