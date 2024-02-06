import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

export const __filenameNew = fileURLToPath(import.meta.url)
export const __dirnameNew = dirname(__filenameNew)
// 确定根目录
export const projRoot = resolve(__dirnameNew, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const epRoot = resolve(pkgRoot, 'mao-plus')
// 打包根目录
export const buildOutput = resolve(projRoot, 'dist')
// 包目录
export const epOutput = resolve(buildOutput, 'mao-plus')
// package.json 目录
export const epPackage = resolve(epRoot, 'package.json')
