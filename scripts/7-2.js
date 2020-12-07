module.exports = input => {
  const lines = input.split('\n').filter(l => !!l).map(s => s.replace(/ bag(s|)/g, '').replace('.', ''))
  const rulesArray = lines.map(line => {
    const [parent, childrenString] = line.split(' contain ')
    if(childrenString === 'no other')
      return {parent, children: []}

    const children = childrenString.split(', ').map(childString => {
      const [_, num, color] = childString.match(/^([0-9]*) (.*)(.|)$/)
      return {
        count: parseInt(num, 10),
        color
      }
    })

    return {
      parent,
      children
    }
  })

  const rules = rulesArray.reduce((acc, cur) => ({...acc, [cur.parent]: cur.children}), {})

  const cache = {}
  const numBags = countChildren(rules, 'shiny gold', cache) - 1
  console.log(numBags)
  return numBags
}

function countChildren(rules, current, cache = {}) {
  if(cache[current] !== undefined)
    return cache[current]

  let bags = 1
  const children = rules[current]
  for(const child of children){
    bags += (child.count * countChildren(rules, child.color, cache))
  }

  console.log(`${current} has ${bags} bags`)
  return (cache[current] = bags)
}