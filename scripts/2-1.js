module.exports = input =>
  input.split('\n').filter(l => l.length).filter(line => {
    const {smin, smax, letter, pass} = line.match(/(?<smin>[0-9]*)-(?<smax>[0-9]*) (?<letter>[a-z]): (?<pass>[a-z]*)/).groups
    const [min, max] = [smin, smax].map(i => parseInt(i, 10))
    const count = (pass.match(new RegExp(letter, 'g')) || []).length

    console.log(min, max, letter, pass, count)

    return min <= count && count <= max
  }).length