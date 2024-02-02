import { resolve } from 'path'
import { copy } from 'fs-extra'
import { buildOutput, epOutput } from './paths.js'

export const copyTypesDefinitions = async () => {
  const src = resolve(buildOutput, 'types', 'packages')
  copy(src, resolve(epOutput, 'es'), { recursive: true })
  copy(src, resolve(epOutput, 'lib'), { recursive: true })
}
