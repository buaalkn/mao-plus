import type { Plugin } from 'vue'

// 通过Vue提供的Plugin类型和传进来的组件类型T的集合进行确定我们的组件类型具有Plugin类型方法，如install
export type SFCWithInstall<T> = T & Plugin
export const withInstall = <T>(comp: T) => {
  ;(comp as SFCWithInstall<T>).install = function (app: any) {
    const { name } = comp as unknown as { name: string }
    app.component(name, comp as SFCWithInstall<T>)
  }
  return comp as SFCWithInstall<T>
}
