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
      title: "参数",
      key: "key",
    }, {
      title: "介绍",
      key: "desc",
    }, {
      title: "类型",
      key: "type",
    }, {
      title: "默认值",
      key: "init",
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
          key: 'columns',
          desc: '表格内容配置',
          type: 'Columns[]',
          init: `[]`,
          require: true,
        }, {
          key: 'dataList',
          desc: '数据',
          type: 'any[]',
          init: `[]`,
          require: true,
        }, {
          key: 'getListLoading',
          desc: '请求列表的loading',
          type: 'boolean',
          init: 'false',
          require: true,
        }, {
          key: 'rowKey',
          desc: '用于指明行的唯一标识符，在勾选中有使用',
          type: 'string',
          init: `id`,
          require: false,
        }, {
          key: 'scrollViewHeight',
          desc: '控制可滚动区域高度。',
          type: 'string',
          init: `600rpx`,
          require: false,
        }, {
          key: 'showTipImage',
          desc: '控制无数据时显示提示文本图片',
          type: 'boolean',
          init: 'false',
          require: true,
        }, {
          key: 'tipTitle',
          desc: '无数据时的提示文本主标题',
          type: 'string',
          init: `提示`,
          require: false,
        }, {
          key: 'tipSubtitle',
          desc: '无数据时的提示文本副标题',
          type: 'string',
          init: `暂无数据`,
          require: false,
        }, {
          key: 'scrollX',
          desc: '是否需要X轴滚动',
          type: 'boolean',
          init: `false`,
          require: false,
        }, {
          key: 'select',
          desc: '控制是否出现勾选。',
          type: 'boolean',
          init: `false`,
          require: false,
        }, {
          key: 'selectKeys',
          desc: '勾选的初始值',
          type: 'string[]',
          init: `[]`,
          require: false,
        }, {
          key: 'isExpand',
          desc: '控制是否点击展开。',
          type: 'boolean',
          init: `false`,
          require: false,
        }, {
          key: 'expandValueKey',
          desc: '展开信息的key值',
          type: 'string',
          init: 'undefined',
          require: false,
        }, {
          key: 'initExpandValue',
          desc: '当展开信息为空时的默认提示语',
          type: 'string',
          init: 'undefined',
          require: false,
        }, {
          key: 'expandStyle',
          desc: '展开信息的最外层的样式',
          type: 'string',
          init: 'undefined',
          require: false,
        }, {
          key: 'dynamicValue',
          desc: '给自定义内容的动态值，用于改变状态 ，建议{value:放的数据}	',
          type: 'Object',
          init: `{}`,
          require: false,
        }, {
          key: 'generic:action-td',
          desc: '当列表项内具有操作列，需要在`columns`内添加`key:action`的一项，操作列的内容往往需要自定义，小程序不提供react,vue的`rander函数`，所以使用到了抽象节点，该属性指明抽象节点的组件。操作列位置可以不固定，点击事件由`bindclickaction`触发',
          type: 'component',
          init: `undefined`,
          require: false,
        }, {
          key: 'generic:expand-component',
          desc: '如果展开区域的内容需要自定义，`expandValueKey`设置为空字符串，则切换到组件模式，传一个组件进来，展开区域的点击事件由`bindclickexpand`触发',
          type: 'component',
          init: `undefined`,
          require: false,
        },])
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