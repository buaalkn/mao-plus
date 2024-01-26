import '@vue/runtime-core'
import type Icon from '@mao-plus/components/icon'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MIcon: typeof Icon
  }
}

export {}
