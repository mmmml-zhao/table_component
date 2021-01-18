
export interface Columns {
  title: string,// 表头
  key: string,// 字段名
  width?: string,// 宽度
  type?: 'action',// 是否是自定义内容
  render?: (value: any, item: any, index: number, data: any) => any,// 设置内容
}
