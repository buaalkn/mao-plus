import { parallel, series } from 'gulp'
// 全量构建
import { buildFullEntry } from './full-bundle.js'
// 模块化构建
import { buildModules } from './modules.js'
// 生成类型定义
import { generateTypesDefinitions } from './types-definitions.js'
// 拷贝类型定义
import { copyTypesDefinitions } from './copyTypesDefinitions.js'
// 拷贝package.json
import { copyFiles } from './copyFile.js'

export default series(
  parallel(buildFullEntry, buildModules, generateTypesDefinitions),
  copyTypesDefinitions,
  copyFiles
)
