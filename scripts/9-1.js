module.exports = (input, mode) => {
  const numbers = input.replace(/\r/g, '').split('\n').filter(l => !!l).map(l => parseInt(l, 10))

  const preamble = mode === 'full' ? 25: 5
  let buffer = []
  for(const number of numbers) {
    if(buffer.length < preamble){
      buffer.push(number)
      continue;
    }

    if(isValid(buffer, preamble, number))
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