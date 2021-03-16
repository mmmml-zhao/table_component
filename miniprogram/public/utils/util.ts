
/**
 * @desc 获取当前页面
 */
export const getNowPage = () => {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

/**
 * @returns {String} 获取系统屏幕相关参数
 */
export const setNavStyle = () => {
  const config: GlobalData.PageConfig = {
    pixelRate: 0.5,               //px与rpx换算关系
    platform: 'ios',             //操作平台 用于适配胶囊高度
    capsuleHeight: 44,           //胶囊高度
    statusBarHeight: 20,         //手机顶部状态栏高度
    titleHeight: 136,            //整个导航头高度
    systemHeight: 0,            //手机屏幕高度
    isAllScreen: false,        //是否是全面屏手机
    isHighHead: false,        //是否是刘海屏手机
    phoneSystem: undefined           //系统版本
  }
  let res = wx.getSystemInfoSync();
  console.log(res)
  // 设置系统
  config.phoneSystem = res.platform.toLowerCase() as "ios" | "android";
  config.pixelRate = res.windowWidth / 750;
  config.platform = res.platform;
  config.statusBarHeight = res.statusBarHeight;
  if (res.platform.toLowerCase() == 'android') {
    config.capsuleHeight += 4;
  }
  config.titleHeight = (config.capsuleHeight + config.statusBarHeight) / config.pixelRate;
  if (res.statusBarHeight >= 44) {
    config.isHighHead = true;
  }
  if (res.windowHeight > 750) config.isAllScreen = true;
  config.systemHeight = res.windowHeight;
  console.log(config)
  return config
}

/**
 * @param {Number|null} ms 需要延时的毫秒数
 * @returns {String} 延时函数
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export interface IRes<T> {
  status: number,
  errorMsg?: string,
  data: T
}

/**
 * @param {Number|null} ms 需要延时的毫秒数
 * @returns {String} 延时函数
 */
export function mockData<T>(type: 'data', item: T): Promise<IRes<T>>;
export function mockData<T>(type: 'list', item: T, title: string, pageIndex: number, pageSize: number): Promise<IRes<{
  list: T[];
  pageCount: number;
}>>;
export function mockData<T>(type: 'data' | 'list', item: T, title?: string, pageIndex?: number, pageSize?: number): any {
  if (type === 'data') {
    return new Promise(async (resolve) => {
      await delay(1000)
      resolve({
        data: item,
        status: 1
      } as IRes<T>)
    })
  } else {
    const dataList: T[] = []
    for (let i = 0; i < pageSize!; i++) {
      dataList.push({
        ...item,
        id: i + 1 + (pageIndex! - 1) * pageSize!,
        [title!]: `${i + 1 + (pageIndex! - 1) * pageSize!}条数据`
      })
    }
    return new Promise(async (resolve) => {
      await delay(1000)
      resolve({
        data: {
          list: dataList,
          pageCount: 2
        },
        status: 1
      } as IRes<{
        list: T[];
        pageCount: number;
      }>)
    })
  }
}