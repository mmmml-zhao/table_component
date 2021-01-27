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

  },
  /**
   * 组件的初始数据
   */
  data: {
    tableColumns: [{
      title: "绑定事件名",
      key: "key",
    }, {
      title: "介绍",
      key: "desc",
    }, {
      title: "类型",
      key: "type",
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
          key: 'bindclicklistitem',
          desc: '点击列表行事件',
          type: 'Function(e);  e.detail.value = {index:number（当前行序号）,item: any（当前行的内容）}'
        }, {
          key: 'bindclickexpand',
          desc: '点击展开内容事件',
          type: 'Function(e); e.detail.value = {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)};(这是我这里定义的结构，具体可以自己定义在expand-component里)}'
        }, {
          key: 'bindclickaction',
          desc: '点击抽象节点事件',
          type: 'Function(e); e.detail.value = {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)};(这是我这里定义的结构，具体可以自己定义在action-td里)}'
        }, {
          key: 'bindcheckkey',
          desc: '勾选事件,返回被勾选项的rowKey数组',
          type: 'Function(e); e.detail.value = any[]//(数组内每一项是rowKey字段定义的数据的toString()结果)'
        }, {
          key: 'bindscrolltolower',
          desc: '滚动触底',
          type: 'Function() '
        }, {
          key: 'bindscrolltoupper',
          desc: '滚动触顶',
          type: 'Function() '
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