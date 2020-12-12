module.exports = (input) => {
  // Parse input file
  const instructions = input.replace(/\r/g, '').split('\n').filter(l => !!l).map(instruction => ({
    action: instruction.charAt(0),
    value: parseInt(instruction.slice(1))
  }))

  console.log(instructions)

  let direction = 90
  const offsets = instructions.map(({action, value}) => {
    if(action === 'R')
      direction = (direction + value) % 360
    else if(action === 'L')
      direction = (direction + 360 - value) % 360
    else
      return convertMoveToOffset(convertDirection(action, direction), value)

    return {n: 0, e: 0}
  })

  console.log(offsets)

  const total = offsets.reduce((acc, cur) => ({n: acc.n + cur.n, e: acc.e + cur.e}), {n: 0, e: 0})
  return Math.abs(total.n) + Math.abs(total.e)
}

function convertMoveToOffset(direction, distance) {
  console.log(direction, distance)
  switch(direction) {
    case 'N':
      return {n: distance, e: 0}
    case 'S':
      return {n: -1 * distance, e: 0}
    case 'E':
      return {e: distance, n: 0}
    case 'W':
      return {e: -1 * distance, n: 0}

    default:
      throw new Error('Unknown direction: ' + direction)
  }
}

const directions = ['N', 'E', 'S', 'W']
function convertDirection(direction, heading) {
  if(direction === 'F') return directions[(heading / 90) % 4]
  return direction
}