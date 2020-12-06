module.exports = input => {
  const groups = input.replace(/\r\n/g, '\n')
    .split('\n\n')
    .filter(l => !!l)
    .map(groupString =>
      groupString.split('\n').filter(l => !!l)
    )

  const counts = groups.map(group => {
    const letters = group.join('').split('').sort().join('').search(new RegExp(`(.)\\${group.length - 1}`))
    return letters.length
  })

  return counts.reduce((a,b) => (a+b), 0)
}
