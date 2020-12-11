module.exports = (input, mode) => {
  const numbers = input.replace(/\r/g, '').split('\n').filter(l => !!l).map(l => parseInt(l, 10))

  const jolts = numbers.sort((a,b) => (a-b))

  const edges = [
    {value: 0, candidates: [1, 2, 3]},
    // Just assume each index can go to the three following it (+2, +3, +4 because index 0 gets given to the wall socket)
    ...jolts.map((jolt, i) => ({value: jolt, candidates: [i + 2, i + 3, i + 4]}))
  ]

  return countViableConnections(edges, 0, {}, edges[edges.length - 1].value + 3)
}

function countViableConnections(edges, currentIndex, cache, goal) {
  if(cache[currentIndex] !== undefined) return cache[currentIndex]

  const currentNode = edges[currentIndex]
  const maxJump = currentNode.value + 3
  let connections = 0;

  if(goal <= maxJump){
    connections++
    console.log(`  Can reach goal (${goal}) from ${currentIndex} (${currentNode.value})`)
  }

  for(const nextIndex of currentNode.candidates) {
    const dest = edges[nextIndex]

    if(dest === undefined) continue;

    if(dest.value <= maxJump) {
      console.log(`  Can reach index ${nextIndex} (${dest.value}) from ${currentIndex} (${currentNode.value})`)
      connections += countViableConnections(edges, nextIndex, cache, goal)
    }
  }

  console.log(`Finished ${currentIndex} (${currentNode.value}): ${connections}`)

  return (cache[currentIndex] = connections);
}