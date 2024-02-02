import { relative, resolve } from 'path'
import { readFileSync } from 'fs'
import { compileScript, parse } from '@vue/compiler-sfc'
import { Project } from 'ts-morph'
import glob from 'fast-glob'
import { buildOutput, epRoot, pkgRoot, projRoot } from './paths.js'
import { excludeFiles } from './utils.js'

const TSCONFIG_PATH = resolve(projRoot, 'tsconfig.web.json')
const outDir = resolve(buildOutput, 'types')

export const generateTypesDefinitions = async () => {
  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true, // 是否只输出类型文件 .d.ts
      outDir, // 输出目录
      baseUrl: projRoot, // 用于解析非相对模块名称的目录
      preserveSymlinks: true, // 它对应了 Node.js 中 --preserve-symlinks 选项的行为，Node.js 有这样一个选项：–preserve-symlinks，可以设置成按照软链所在的位置查找依赖
      skipLibCheck: true, // 跳过.d.ts类型声明文件的类型检查。这样可以加快编译速度
      noImplicitAny: false, // 是否允许隐式声明 any 类型了
    },
    tsConfigFilePath: TSCONFIG_PATH, // 手动指定 tsconfig.json 文件作为 ts-morph 项目的 TypeScript 配置
    skipAddingFilesFromTsConfig: true, // 取消从 tsconfig.json 文件中添加 TypeScript 源文件
  })
  await addSourceFiles(project)

  project.emit()
}

async function addSourceFiles(project) {
  // 读取的文件类型 .js .jsx .ts .tsx .vue
  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'

  const filePaths = excludeFiles(
    await glob([globSourceFile, '!mao-plus/**/*'], {
      cwd: pkgRoot, // 读取 packages 目录下除了 mao-plus 目录的文件
      absolute: true, // 读取绝对路径
      onlyFiles: true, // 只读取文件
    })
  )
  const epPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: epRoot, // 读取 ./packages/cobyte-ui 目录下的文件
      onlyFiles: true, // 只读取文件
    })
  )
  // console.log('filePaths', filePaths, 'epPaths', epPaths)

  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        // 处理 .vue 文件
        const content = readFileSync(file, 'utf-8')
        const sfc = parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = script?.content ?? ''
          if (scriptSetup) {
            const compiled = compileScript(sfc.descriptor, {
              id: 'xxx',
            })
            content += compiled.content
          }
          const lang = scriptSetup.lang || script.lang || 'js'
          project.createSourceFile(
            `${relative(process.cwd(), file)}.${lang}`,
            content
          )
        }
      } else {
        project.addSourceFileAtPath(file)
      }
    }),
    ...epPaths.map(async (file) => {
      const content = readFileSync(resolve(epRoot, file), 'utf-8')
      project.createSourceFile(resolve(pkgRoot, file), content)
    }),
  ])
}
