#!/usr/bin/env node
const loadFile = require('./utils/loadFile')
const {writeFileSync} = require('fs')

const argIndex = process.argv.findIndex(arg => arg.match(/aoc\.js$/)) + 1

const day = process.argv[argIndex]
let part = parseInt(process.argv[argIndex + 1], 10)
let mode = process.argv[argIndex + 2]

if(Number.isNaN(part))
  mode = process.argv[argIndex + 1]

if(!part) part = 1
if(!mode) mode = 'sample'

if(!day)
  throw Error("Must supply a day!")

console.log(`Testing day ${day}, part ${part}, mode ${mode}`)

console.log('Reading input')
const input = loadFile('inputs', day, part, mode)

console.log('Running script')
const result = '' + loadFile('scripts', day, part, mode)(input)

console.log('Comparing results')


try {
  const solution = loadFile('solutions', day, part, mode)

  if(result !== solution){
    console.log('Unequal solutions!')
    console.log(`Reference: ${solution} (type: ${typeof solution})`)
    console.log(`Ours:      ${result} (type: ${typeof result})`)
  } else {
    console.log('Succeeded!')
  }
} catch (err) {
  if(!/^Unable to find file:/.test(err.message))
    throw err

  console.log('Unable to read reference solution, writing file . . .')
  writeFileSync(`./solutions/${day}-${part}-${mode}.txt`, result)
  console.log(result)
}
