import { withInstall, withNoopInstall } from '@mao-plus/utils'
import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'
const MButton = withInstall(Button, { ButtonGroup })
export const MButtonGroup = withNoopInstall(ButtonGroup)
export default MButton
export * from './src/button'
