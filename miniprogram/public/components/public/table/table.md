# 使用说明

该组件具有 列表展示模式，勾选模式，展开行模式。
1. 复制`/miniprogram/public/components/public`下面的三个组件，到你的公共组件文件夹下（其实这三个组件也是也可以合为一体，因为empty与load_more组件是可以单独使用的，所以没有放到table组件中）
2. 在需要使用的页面引入table组件即可。

# 示例小程序
![小程序图片](https://mmbiz.qpic.cn/mmbiz_jpg/NNDgcXA2O90eRXGPicjGqcvetdnNgk8icDpnBcxoEtEwSQgibXmib0LnB2icLYGtGlW5NE30N1fn4M0f165MkxcicoOg/0?wx_fmt=jpeg)

# API

## prop

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|-----|-----|-----|-----|-----|
|columns|	表格的配置	| Columns[] | [] | true |
|dataList|	数据	| any[] | [] |	true |
|getListLoading|	请求列表的loading 	| boolean | false| true |
|showTipImage|	无数据时的提示文本图片	| boolean | false| true |
|rowKey|	用于指明行的唯一标识符，在勾选中有使用	| string | id | false |
| tableHeight | table高度。|string| 600rpx |false |
|tipTitle|	无数据时的提示文本主标题   | string | 提示 | false |
|tipSubtitle|	无数据时的提示文本副标题 	| string |  暂无数据| false |
|scrollX|	是否需要X轴滚动。	| boolean | false| false |
|select|	控制是否出现勾选。 	| boolean | false| false |
|selectKeys|	勾选的初始值 	| any[] | []| false |
|generic:action-td|	当列表项内具有操作列，需要在`columns`内添加`type:action`的一项，操作列的内容往往需要自定义，小程序不提供react,vue的`rander函数`，所以使用到了抽象节点，该属性指明抽象节点的组件。操作列位置可以不固定，点击事件由`bindclickaction`触发	| component |undefined | false |
|isExpand|	控制是否点击展开。 	| boolean | false|false |
|expandValueKey|	展开信息的key值 	| string | false |
|initExpandValue|	当展开信息为空时的默认提示语 	| string | '暂无信息' |false |
|expandStyle|	 展开信息的最外层的样式	| string | ''|false |
|generic:expand-component| 如果展开区域的内容需要自定义，`expandValueKey`设置为空字符串，则切换到组件模式，传一个组件进来，展开区域的点击事件由`bindclickexpand`触发	| component | undefined |false |
|dynamicValue|	给自定义内容的动态值，用于改变状态 ，建议{value:放的数据}	| object | {} |false |
  
  
## event

|事件 | 解释| 类型|
|-----|-----|-----|
|bindclicklistitem| 点击列表行事件  |Function(e);  e.detail.value = {index:number（当前行序号）,item: any（当前行的内容）}|  
|bindclickexpand| 点击展开内容事件  |Function(e); e.detail.value = {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)};(这是我这里定义的结构，具体可以自己定义在expand-component里)}|  
|bindclickaction| 点击抽象节点事件 |Function(e); e.detail.value = {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)};(这是我这里定义的结构，具体可以自己定义在action-td里)}|  
|bindonactionevent| 抽象节点内的业务事件触发 |Function(e); e.detail.value = {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)};(这是我这里定义的结构，具体可以自己定义在action-td里)}|  
|bindcheckkey| 勾选事件 返回被勾选项的rowKey数组 |Function(e); e.detail.value = any[]//(数组内每一项是rowKey字段定义的数据的toString()结果)|  
|bindscrolltolower| 滚动触底 | Function() |  
|bindscrolltoupper| 滚动触顶 | Function() |

## column  
列描述数据对象，是 columns 中的一项，Column 使用相同的 API。
    
|事件 | 解释| 类型| 必填|  
|-----|-----|-----|-----|
|title|字段名中文含义|string| true|
|key|字段名|string| true|
|width|单元格宽度|string| false|
|type|判断字段是否是自定义组件|'action'/undefined | false|
|render|td内内容由函数返回 (value: any, item: any, index: number, data?: 当前页面的this.data) => any,// 设置内容|function| false|