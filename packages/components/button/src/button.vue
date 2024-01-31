<template>
  <button
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_size),
      ns.is('disabled', disabled),
      ns.is('round', round),
      ns.is('circle', circle),
    ]"
    :style="buttonStyle"
    @click="handleClick"
  >
    <m-icon v-if="icon">
      <component :is="icon" />
    </m-icon>
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useNamespace } from '@mao-plus/hooks'
import { buttonProps } from './button'
import { buttonGroupContextKey } from './constant'
import { useButtonCustomStyle } from './button-custom'

defineOptions({
  name: 'MButton',
})
const props = defineProps(buttonProps)
const emit = defineEmits(['handle'])

const buttonStyle = useButtonCustomStyle(props)
const ns = useNamespace('button')
// 点击事件函数
const handleClick = (evt: MouseEvent) => {
  emit('handle', evt)
}
const buttonGroupContext = inject(buttonGroupContextKey, undefined)
const _size = computed(() => props.size || buttonGroupContext?.size)
const _type = computed(() => props.type || buttonGroupContext?.type)
defineExpose({
  handleClick,
})
</script>
