import { copyFile } from 'fs/promises'
import { join } from 'path'
import { epOutput, epPackage } from './paths.js'

export const copyFiles = async () =>
  copyFile(epPackage, join(epOutput, 'package.json'))
