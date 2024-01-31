import { computed } from 'vue'
import type { ButtonProps } from './button'

export function useButtonCustomStyle(props: ButtonProps) {
  return computed(() => {
    const styles: Record<string, string> = {}
    if (props.color) return {}
    return styles
  })
}
