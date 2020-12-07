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
  const canContainShinyGold = Object.keys(rules).filter(color => canContain(rules, color, 'shiny gold', cache))
  console.log(canContainShinyGold)
  return canContainShinyGold.length
}

function canContain(rules, current, search, cache = {}) {
  if(cache[current] !== undefined)
    return cache[current]

  const children = rules[current]
  for(const child of children)
    if(child.color === search || canContain(rules, child.color, search, cache))
      return (cache[current] = true)

  return (cache[current] = false)
}