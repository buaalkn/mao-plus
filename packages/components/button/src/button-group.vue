<template>
  <div :class="[ns.b('group')]">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { provide, reactive, toRef } from 'vue'
import { useNamespace } from '@mao-plus/hooks'
import { buttonGroupProps } from './button-group'
import { buttonGroupContextKey } from './constant'
defineOptions({
  name: 'MButtonGroup',
})
const ns = useNamespace('button')
const props = defineProps(buttonGroupProps)
provide(
  buttonGroupContextKey,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
  })
)
</script>
