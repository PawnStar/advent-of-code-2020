module.exports = input => {
  return input.split('\n').filter(l => l.length).filter(line => {
    const {smin, smax, letter, pass} = line.match(/(?<smin>[0-9]*)-(?<smax>[0-9]*) (?<letter>[a-z]): (?<pass>[a-z]*)/).groups
    const [pos1, pos2] = [smin, smax].map(i => parseInt(i, 10))

    let num = 0

    if(pass.charAt(pos1 - 1) === letter) num++
    if(pass.charAt(pos2 - 1) === letter) num++

    return num === 1
  }).length
}
