module.exports = (input) => {
  // Parse input file
  const instructions = input.replace(/\r/g, '').split('\n').filter(l => !!l).map(instruction => ({
    action: instruction.charAt(0),
    value: parseInt(instruction.slice(1))
  }))

  let waypoint = {n: 1, e: 10}
  const offsets = instructions.map(({action, value}) => {
    if(action === 'R')
      rotateWaypoint(waypoint, value)
    else if(action === 'L')
      rotateWaypoint(waypoint, -1 * value)
    else if(action === 'F')
      return getOffsetTowardsWaypoint(waypoint, value)
    else
      moveWaypoint(waypoint, action, value)

    return {n: 0, e: 0}
  })

  const total = offsets.reduce((acc, cur) => ({n: acc.n + cur.n, e: acc.e + cur.e}), {n: 0, e: 0})
  return Math.abs(total.n) + Math.abs(total.e)
}

function rotateWaypoint(waypoint, degreesClockwise) {
  const rots = (((degreesClockwise < 0) ? 360 + degreesClockwise : degreesClockwise) / 90) % 4
  // console.log(`rotating ${degreesClockwise} clockwise for ${rots} 90deg steps clockwise`)

  for(let i = 0; i < rots; i++) {
    const temp = waypoint.e
    waypoint.e = waypoint.n
    waypoint.n = -1 * temp
    // console.log(`  Waypoint: ${JSON.stringify(waypoint)}`)
  }

  console.log(`Waypoint: ${JSON.stringify(waypoint)}`)
}

function getOffsetTowardsWaypoint(waypoint, times) {
  const offset = {n: waypoint.n * times, e: waypoint.e * times}
  console.log(`Move offset: ${JSON.stringify(offset)}`)
  return offset
}

function moveWaypoint(waypoint, direction, value) {
  let distance = value
  if(direction === 'S' || direction === 'W')
    distance = -1 * value

  if(direction === 'S' || direction === 'N')
    waypoint.n += distance

  if(direction === 'E' || direction === 'W')
    waypoint.e += distance

  console.log(`Waypoint: ${JSON.stringify(waypoint)}`)
}