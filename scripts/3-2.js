module.exports = input => {
  const lines = input.split('\n').filter(l => !!l)

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ]

  const treesEncountered = slopes.map(([rightStep, downStep]) => checkSlope(lines, rightStep, downStep))
  // console.log(treesEncountered)

  return treesEncountered.reduce((prev, current) => prev * current, 1)
}

const checkSlope = (lines, rightStep, downStep) => {
  let row = 0;
  let col = 0;

  let trees = 0;

  while(row < lines.length) {
    if(lines[row].charAt(col) === '#')
      trees++;

    // console.log(row, col, lines[row].charAt(col), lines[row].length)
    col = (col + rightStep) % (lines[row].length - 1)
    row += downStep
  }

  return trees
}