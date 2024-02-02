export const excludeFiles = (files) => {
  const excludes = ['node_modules', '__tests__']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}
