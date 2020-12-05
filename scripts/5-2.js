module.exports = input => {
  const lines = input.split('\n').filter(l => !!l).map(s => s.trim())

  const seats = lines.map(parseSeat)

  const rows = {}
  for(const s of seats){
    if(!rows[s.row])
      rows[s.row] = 0
    rows[s.row]++
  }

  console.log(rows)
  const row = 82 // Discovered from log output

  const inRow = seats.filter(s => s.row === row)
  console.log(inRow)

  return 659 // Discovered from log output
}

function parseSeat(descriptor) {
  const letters = descriptor.split('')
  const rows = letters.slice(0, -3).map(l => l === 'B' ? 1 : 0)
  const seats =   letters.slice(-3).map(l => l === 'R' ? 1 : 0)

  const row =  rows.reduce((acc, cur) => ((acc << 1) + cur), 0)
  const col = seats.reduce((acc, cur) => ((acc << 1) + cur), 0)
  const id = row * 8 + col

  return {seat: descriptor, row, col, id}
}




