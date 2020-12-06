module.exports = input => {
  const groups = input.replace(/\r\n/g, '\n')
    .split('\n\n')
    .filter(l => !!l)
    .map(groupString =>
      groupString.split('\n').filter(l => !!l)
    )

  const counts = groups.map(group => group.join('').split('').sort().join('').replace(/(.)\1{1,}/g, r => r.charAt(0)).length )

  return counts.reduce((a,b) => (a+b), 0)
}
