import { resolve } from 'path'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'
import { epOutput, epRoot } from './paths.js'

// 全量打包任务函数
export const buildFullEntry = async () => {
  const bundle = await rollup({
    // 1-配置入口文件
    input: resolve(epRoot, 'index.ts'),
    // 2-配置插件
    plugins: [
      vue(),
      nodeResolve({
        extensions: ['.ts'],
      }),
      replace({
        'process.env.NODE_ENV': '"production"',
        preventAssignment: true, // 防止在字符串后面紧跟一个等号时替换
      }),
      esbuild(),
    ],
    external: ['vue'],
  })
  // 3-配置输出文件格式
  bundle.write({
    format: 'umd',
    file: resolve(epOutput, 'dist', 'index.full.js'),
    name: 'MaoPlus',
    globals: {
      vue: 'Vue',
    },
  })
}
