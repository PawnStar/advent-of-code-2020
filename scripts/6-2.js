module.exports = input => {
  const groups = input.replace(/\r\n/g, '\n')
    .split('\n\n')
    .filter(l => !!l)
    .map(groupString =>
      groupString.split('\n').filter(l => !!l)
    )

  const counts = groups.map(group => group.join('').split('').sort().join('').match(new RegExp(`(.)\\1{${group.length - 1}}`, 'g'))?.length || 0 )

  return counts.reduce((a,b) => (a+b), 0)
}
