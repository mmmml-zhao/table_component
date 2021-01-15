
declare namespace WechatMiniprogram {
  namespace Component {
    interface OtherOption {
      storeBindings: {
        store: any,
        fields?: {
          [key: string]: <T>(store: T) => any
        },
        actions?: string[]
      },
      computed: {
        [key: string]: (...data: any[]) => any
      },
      watch: any,
    }

    // 因为component的wx定义里 methods 是  Partial<Record<string, (...args: any[]) => any>>> ，而我从 Partial<WechatMiniprogram.Page.ILifetime> 的 （type Partial<T> = { [P in keyof T]?: T[P] | undefined; }）带有undefined类型
    type ComponentLifeCycle = Partial<WechatMiniprogram.Page.ILifetime>
  }
}