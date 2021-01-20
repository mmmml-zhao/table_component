import { Columns } from '../../../../public/components/public/table/data'
import { DataListItem } from './data'
import { mockData } from '../../../../public/utils/util'

// 获取应用实例
const app = getApp<IAppOption>()

type InitData = {
  dataList: DataListItem[],
  tableColumns: Columns[],
  getListLoading: boolean
}

type InitProperty = {
  detail: WechatMiniprogram.Component.FullProperty<ObjectConstructor>
}

type InitMethod = {
  options: any
  getList(): void,
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
      title: "key",
      key: "key",
    }, {
      title: "介绍",
      key: "desc",
    }, {
      title: "类型",
      key: "type",
    }, {
      title: "必填",
      key: "require",
    }],// table 表头参数
    dataList: [],// 学校数组
    getListLoading: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    options: {},
    // 获取列表
    async getList() {
      try {
        this.setData({
          getListLoading: true
        })
        const res = await mockData<DataListItem[]>('data', [{
          key: 'title',
          desc: '字段名中文含义',
          type: 'string',
          require: true
        }, {
          key: 'key',
          desc: '字段名',
          type: 'string',
          require: true
        }, {
          key: 'width',
          desc: '单元格宽度',
          type: 'string',
          require: false
        }, {
          key: 'type',
          desc: '判断字段是否是自定义组件',
          type: 'action',
          require: false
        }, {
          key: 'render',
          desc: 'td内内容由函数返回 (value: any, item: any, index: number, data?: 当前页面的this.data) => any,// 设置内容',
          type: 'function',
          require: false
        }])
        this.setData({
          dataList: res.data,
          getListLoading: false
        })
      } catch (e) {
        this.setData({
          getListLoading: false
        })
        console.log(e)
      }
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