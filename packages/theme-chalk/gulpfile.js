import path from 'path'
import dartSass from 'sass'
import { dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import consola from 'consola'
import { epOutput } from '@mao-plus/utils'

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(epOutput, 'theme-chalk')

function buildThemeChalk() {
  const sass = gulpSass(dartSass)
  const noMPrefixFile = /(index|base|display)/
  return src(path.resolve(__dirname, 'src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: true }))
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${details.name}: ${details.stats.originalSize / 1000} KB -> ${
            details.stats.minifiedSize / 1000
          } KB`
        )
      })
    )
    .pipe(
      rename((path) => {
        if (!noMPrefixFile.test(path.basename)) {
          path.basename = `m-${path.basename}`
        }
      })
    )
    .pipe(dest(distFolder))
}

// 拷贝样式构建产物
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**/*`).pipe(dest(distBundle))
}

// 拷贝样式源代码
export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  )
}

export const build = parallel(
  copyThemeChalkSource,
  series(buildThemeChalk, copyThemeChalkBundle)
)

export default build
