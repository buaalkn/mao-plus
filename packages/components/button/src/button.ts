import type { ExtractPropTypes, PropType } from 'vue'
import type Button from './button.vue'
export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
]
export const buttonNativeTypes = ['button', 'submit', 'reset']

export const buttonProps = {
  type: {
    type: String,
    // values: buttonTypes,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
  },
  icon: {
    type: [Object, String] as PropType<object | string>,
    default: '',
  },
  round: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
  },
} as const
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonInstance = InstanceType<typeof Button>
