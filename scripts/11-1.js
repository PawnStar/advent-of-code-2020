module.exports = (input) => {
  // Parse input file
  let rows = input.replace(/\r/g, '').split('\n').filter(l => !!l).map(row =>
    row.split('').map(letter => letter === 'L' ? {type: 'seat', occupied: false} : {type: 'floor'})
  )

  // Figure out neighbors that aren't floor
  rows = rows.map((row, rowNum) =>
    row.map((seat, seatNum) => {
      if(seat.type === 'floor')
        return seat;

      const neighbors = seat.neighbors = []

      if(rows[rowNum - 1]?.[seatNum - 1]?.type === 'seat')
        neighbors.push({row: rowNum - 1, seat: seatNum - 1})

      if(rows[rowNum]?.[seatNum - 1]?.type === 'seat')
        neighbors.push({row: rowNum, seat: seatNum - 1})

      if(rows[rowNum + 1]?.[seatNum - 1]?.type === 'seat')
        neighbors.push({row: rowNum + 1, seat: seatNum - 1})

      if(rows[rowNum - 1]?.[seatNum]?.type === 'seat')
        neighbors.push({row: rowNum - 1, seat: seatNum})

      if(rows[rowNum + 1]?.[seatNum]?.type === 'seat')
        neighbors.push({row: rowNum + 1, seat: seatNum})

      if(rows[rowNum - 1]?.[seatNum + 1]?.type === 'seat')
        neighbors.push({row: rowNum - 1, seat: seatNum + 1})

      if(rows[rowNum]?.[seatNum + 1]?.type === 'seat')
        neighbors.push({row: rowNum, seat: seatNum + 1})

      if(rows[rowNum + 1]?.[seatNum + 1]?.type === 'seat')
        neighbors.push({row: rowNum + 1, seat: seatNum + 1})

      return seat
    })
  )

  // Iterate
  let changed = true
  for(let i = 0; changed; console.log(i++))
    [changed, rows] = iterateSeats(rows)

  // console.log(rows)
  const numOccupied = rows.flat().filter(seat => seat.occupied).length
  return numOccupied
}

function iterateSeats(rows) {
  let changed = false;

  const newRows = rows.map(row =>
    row.map(seat => {
      if(seat.type === 'floor')
        return seat

      const numOccupiedNeighbors = seat.neighbors.filter(({row, seat}) => rows[row][seat]?.occupied).length
      if(!seat.occupied && !numOccupiedNeighbors){
        changed = true
        return {...seat, occupied: true}
      }
      if(seat.occupied && numOccupiedNeighbors >= 4){
        changed = true
        return {...seat, occupied: false}
      }
      return seat
    })
  )

  return [changed, newRows]
}