module.exports = (input) => {
  // Parse input file
  let rows = input.replace(/\r/g, '').split('\n').filter(l => !!l).map(row =>
    row.split('').map(letter => letter === 'L' ? {type: 'seat', occupied: false} : {type: 'floor'})
  )

  console.log('Computing neighbors')
  // Figure out neighbors that aren't floor
  rows = rows.map((row, rowNum) =>
    row.map((seat, seatNum) => {
      if(seat.type === 'floor')
        return seat;

      const neighbors = [
        getNeighbor(rows, rowNum, seatNum, -1, -1),
        getNeighbor(rows, rowNum, seatNum,  0, -1),
        getNeighbor(rows, rowNum, seatNum,  1, -1),
        getNeighbor(rows, rowNum, seatNum, -1,  0),
        getNeighbor(rows, rowNum, seatNum,  1,  0),
        getNeighbor(rows, rowNum, seatNum, -1,  1),
        getNeighbor(rows, rowNum, seatNum,  0,  1),
        getNeighbor(rows, rowNum, seatNum,  1,  1)
      ]

      seat.neighbors = neighbors.filter(s => !!s)

      return seat
    })
  )

  // Iterate
  let changed = true
  for(let i = 0; changed; console.log(i++))
    [changed, rows] = iterateSeats(rows)


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
      if(seat.occupied && numOccupiedNeighbors >= 5){
        changed = true
        return {...seat, occupied: false}
      }
      return seat
    })
  )

  return [changed, newRows]
}

function getNeighbor(rows, rowNum, seatNum, changeRow, changeSeat) {
  for(offset = 1; true; offset++){
    const current = rows[rowNum + (changeRow * offset)]?.[seatNum + (changeSeat * offset)]

    if(!current) return null;

    if(current.type === 'seat')
      return {row: rowNum + (changeRow * offset), seat: seatNum + (changeSeat * offset)}
  }
}