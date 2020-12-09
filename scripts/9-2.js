module.exports = (input, mode) => {
  const numbers = input.replace(/\r/g, '').split('\n').filter(l => !!l).map(l => parseInt(l, 10))

  const preamble = mode === 'full' ? 25: 5
  const firstInvalid = findFirstInvalid(numbers, preamble)

  // console.log('Invalid num: ' + firstInvalid)
  const range = findContigSum(numbers, firstInvalid)
  // console.log(range)
  return Math.min(...range) + Math.max(...range)
}

function findFirstInvalid(numberList, preambleLength) {
  let buffer = []
  for(const number of numberList) {
    if(buffer.length < preambleLength){
      buffer.push(number)
      continue;
    }

    if(isValid(buffer, preambleLength, number))
      buffer.push(number)
    else
      return number
  }
}

function isValid(numberList, bufferLenth, next) {
  const numsToConsider = numberList.slice(-bufferLenth)

  let seen = {}
  for(const num of numsToConsider){
    if(seen[num])
      continue;

    seen[num] = true

    const complement = next - num
    if(seen[complement]){
      return true;
    }
  }

  return false;
}

function findContigSum(numberList, invalidNum) {
  for(const i in numberList) {
    let sum = numberList[i];
    let j = parseInt(i, 10) + 1
    // console.log(i, numberList[i])

    do {
      sum += numberList[j]
      // console.log(`  ${j} ${numberList[j]}: ${sum}`)

      if(sum === invalidNum)
        return numberList.slice(i, j + 1)

      j++

    } while (sum < invalidNum && j < numberList.length)
  }

  throw new Error('Unable to find contiguous sum')
}