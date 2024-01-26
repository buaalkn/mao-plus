<template>
  <i :class="ns.b()" :style="style">
    <slot />
  </i>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@mao-plus/hooks'
import { iconProps } from './icon'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'MIcon',
})
const props = defineProps(iconProps)
const ns = useNamespace('icon')
const style = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {}
  return {
    fontSize: props.size ? `${props.size}px` : undefined,
    '--color': props.color,
  }
})
</script>
