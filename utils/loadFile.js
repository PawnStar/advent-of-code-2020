const fs = require('fs')
const path = require('path')
const root = path.join(__dirname, '..')

module.exports = (dir, day, part, suffix) => {
  const directory = fs.readdirSync(path.join(root, dir))

  const variations = []

  if(day && part) variations.push(`${day}-${part}`)
  if(day && part && suffix) variations.push(`${day}-${part}-${suffix}`)
  if(day && suffix) variations.push(`${day}-${suffix}`)

  if(!variations.length)
    throw new Error("Cannot load file with no day, part, or suffix!")

  const patterns = variations.map(pattern => new RegExp('^' + pattern + '\\.(txt|js)$'))
  const matches = directory.filter(fileName => patterns.reduce((passed, pattern) => {
    return passed || pattern.test(fileName)
  }, false))

  if(matches.length > 1)
    throw new Error(`Not specific enough: ${dir}/, ${day}, ${part}, ${suffix}`)
  if(matches.length < 1)
    throw new Error(`Unable to find file: ${dir}/, ${day}, ${part}, ${suffix}`)
  
  const [match] = matches
  const filePath = path.join(root, dir, match)
  const ext = match.split('.')[1]
  if(ext === 'js')
    return require(filePath)
  return fs.readFileSync(filePath, 'utf-8')
}