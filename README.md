# 使用说明

该组件具有 列表展示模式，勾选模式

1. 属性介绍  

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|-----|-----|-----|-----|-----|
|columns|	表格的配置	| Columns[] | [] | true |
|dataList|	数据	| any[] | [] |	true |
|getListLoading|	请求列表的loading 	| boolean | false| true |
|showTipImage|	无数据时的提示文本图片	| boolean | false| true |
|rowKey|	用于指明行的唯一标识符，在勾选中有使用	| string | id | false |
|scrollViewHeight|控制可滚动区域高度。|string| 600rpx|false |
|tipTitle|	无数据时的提示文本主标题   | string | 提示 | false |
|tipSubtitle|	无数据时的提示文本副标题 	| string |  暂无数据| false |
|select|	控制是否出现勾选。 	| boolean | false| false |
|selectKeys|	勾选的初始值 	| any[] | []| false |
|generic:action-td|	当列表项内具有操作列，需要在`columns`内添加`key:action`的一项，操作列的内容往往需要自定义，小程序不提供react,vue的`rander函数`，所以使用到了抽象节点，该属性指明抽象节点的组件。操作列位置可以不固定，点击事件由`bindclickaction`触发	| component |undefined | false |
|isExpand|	控制是否点击展开。 	| boolean | false|false |
|expandValueKey|	展开信息的key值 	| string | false |
|initExpandValue|	当展开信息为空时的默认提示语 	| string | '暂无信息' |false |
|expandStyle|	 展开信息的最外层的样式	| string | ''|false |
|generic:expand-component| 如果展开区域的内容需要自定义，`expandValueKey`设置为空字符串，则切换到组件模式，传一个组件进来，展开区域的点击事件由`bindclickexpand`触发	| component | undefined |false |
|dynamicValue|	给自定义内容的动态值，用于改变状态 ，建议{value:放的数据}	| object | {} |false |

2. 事件介绍  

|事件 | 解释| 类型|
|-----|-----|-----|-----|
|bindclicklistitem| 点击列表行事件  | Function({value: {index:number（当前行序号）,item: any（当前行的内容）}})
|bindclickexpand| 点击展开内容事件  | Function({ value: e.detail.value}(这里的值具体是看虚拟节点里的点击事件传什么数据往table，我这里是{ value: {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)}}))
|bindclickaction| 点击抽象节点事件 | Function({ value: e.detail.value}(这里的值具体是看虚拟节点里的点击事件传什么数据往table，我这里是{ value: {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)}}))
|bindcheckkey| 勾选事件 返回被勾选项的rowKey数组 | Function({ from:number(调整位置的item的开始index), to:number(调整位置的item的结束index)})
|bindscrolltolower| 滚动触底 | Function() 
|bindscrolltoupper| 滚动触顶 | Function()


3. 自定义组件使用代码  
  * generic:action-td
引入组件的代码  
```html
<zml-table 
scrollViewHeight="{{tableScrollViewHeight}}" 
columns="{{tableColumns}}" 
dataList="{{dataList}}" 
getListLoading="{{getListLoading}}" 
showTipImage="{{dataList.length===0}}" 
tipTitle="今日未招人" 
tipSubtitle="明日继续努力" 
generic:action-td="action-td" 
select="{{true}}" 
selectKeys="{{[2,4,5]}}" 

bindcheckkey="handleCheckTable" 
bindclicklistitem="handleClickListItem" 
bindscrolltolower="getList" 
bindclickaction="handleClickActionBtn" 
/>
```   

action-td的目标组件代码
```html
<view class="action-box box box-row-center">
  <view class="button close box box-row-center-wrap" size="mini" catchtap="handleClickBtn" data-type="close" wx:if="{{index%2===0}}">
    禁用
  </view>
  <view class="button open box box-row-center-wrap" size="mini" catchtap="handleClickBtn" data-type="open" wx:else>
    启用
  </view>
</view>
```

action-td的目标组件的ts
```typescript

  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
    },
    dynamicValue: {
      type: Object,
      value: {}
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleClickBtn(e) {
      const { type } = e.currentTarget.dataset
      const { index, item } = this.data
      this.triggerEvent('clickaction', {
        value:{
          type:(这个按钮触发的事件类型，如‘close’),
          index:(当前的行),
          item:(当前行的数据)
        } 
      })
    }
  },
```
点击触发自定义事件`clickaction`, 需要传输`{ value: {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)}}`。点击事件使用`catchtap`，不然会触发`bindclicklistitem`事件，看项目需求使用`catchtap`/`bindtap`

* generic:expand-component
引入组件的代码  
```html
<zml-table 
columns="{{tableColumns}}" 
dataList="{{dataList}}" 
scrollViewHeight="700rpx" 
bindclickaction="handleClickAction"
bindclickexpand="handleClickExpand" 
bindscrolltolower="getList" 
getListLoading="{{getListLoading}}" 
showTipImage="{{dataList.length===0&!getListLoading}}" 
tipTitle="暂无兼职人员信息" tipSubtitle="" 
generic:action-td="action-td" 
generic:expand-component="expand-component" 
isExpand="{{true}}" 
expandValueKey="" 
initExpandValue="暂无备注" />
```   

expand-component的目标组件代码
action-td的目标组件的ts
```typescript
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
    },
    dynamicValue: {
      type: Object,
      value: {}
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleClickItem(e) {
      const { type } = e.currentTarget.dataset
      const { index, item } = this.data
      this.triggerEvent('clickexpand', {
         value:{
          type:(这个按钮触发的事件类型，如‘close’),
          index:(当前的行),
          item:(当前行的数据)
        } 
      })
    }
  },
```
点击触发自定义事件`clickexpand`, 需要传输`{ value: {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)}}`。


