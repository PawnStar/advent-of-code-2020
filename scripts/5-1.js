module.exports = input => {
  const lines = input.split('\n').filter(l => !!l).map(s => s.trim())

  const seats = lines.map(parseSeat).map(s => s.id)
  const max = seats.reduce((a,b) => Math.max(a,b), 0)



  return max
}

function parseSeat(descriptor) {
  const letters = descriptor.split('')
  const rows = letters.slice(0, -3).map(l => l === 'B' ? 1 : 0)
  const seats =   letters.slice(-3).map(l => l === 'R' ? 1 : 0)

  const row =    rows.reduce((acc, cur) => ((acc << 1) + cur), 0)
  const col =  seats.reduce((acc, cur) => ((acc << 1) + cur), 0)
  const id = row * 8 + col

  return {seat: descriptor, row, col, id}
}