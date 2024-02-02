import MIcon from '@mao-plus/components/icon'
import MButton from '@mao-plus/components/button'

const components = [MIcon, MButton]
const INSTALLED_KEY = Symbol('INSTALLED_KEY')
const MaoPlus = {
  install(app: any) {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true
    components.forEach((c) => {
      app.use(c)
    })
  },
}

export default MaoPlus
