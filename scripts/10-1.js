module.exports = (input, mode) => {
  const numbers = input.replace(/\r/g, '').split('\n').filter(l => !!l).map(l => parseInt(l, 10))

  const sortedJolts = numbers.sort((a,b) => (a-b))
  const diffs = [sortedJolts[0], ...sortedJolts.map((jolt, i) => (sortedJolts[i+1] - jolt))]
  diffs[diffs.length - 1] = 3

  const counts = diffs.reduce((acc, diff) => ({...acc, [diff]: acc[diff] + 1}), {1: 0, 2: 0, 3: 0})
  console.log(counts)

  return counts[1] * counts[3]
}