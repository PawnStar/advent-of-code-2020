module.exports = input => {
  const lines = input.split('\n').filter(l => !!l)

  const rightStep = 3
  const downStep = 1

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