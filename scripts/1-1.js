module.exports = input => {
  const lines = input.split('\n').filter(l => !!l).map(l => parseInt(l, 10))

  let seen = {}

  for(const line of lines){
    if(seen[line])
      continue;

    seen[line] = true

    const complement = 2020 - line
    if(seen[complement]){
      return line * complement;
    }
  }
}