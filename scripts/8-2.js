module.exports = input => {
  const instructions = input.replace(/\r/g, '').split('\n').filter(l => !!l)
    .map(line => {
      const [instruction, arg] = line.split(' ')
      if(arg.charAt(0) === '+')
        return {instruction, argument: parseInt(arg.slice(1), 10)}
      if(arg.charAt(0) === '-')
        return {instruction, argument: -1 * parseInt(arg.slice(1), 10)}
      throw new Error("Cannot parse arg: " + arg)
    })

  let i;
  for(i = 0; i < instructions.length; i++){
    let result = runMod(instructions, i)
    if(result){
      console.log(`Position ${i}, acc ${result}`)
      return result
    }
  }

  throw new Error("No position worked!")
}

function runMod(code, flipPos) {
  const visited = {}
  const state = {ip: 0, acc: 0}

  // console.log('Attempting modded code at position: ' + flipPos)

  const instructions = code.map((i, pos) => {
    if(pos !== flipPos)
      return i

    if(i.instruction === 'acc')
      return i

    if(i.instruction === 'jmp')
      return {
        instruction: 'nop',
        argument: i.argument
      }

    if(i.instruction === 'nop')
      return {
        instruction: 'jmp',
        argument: i.argument
      }
  })

  // console.log(code)
  // console.log(instructions)

  do {
    visited[state.ip] = true
    // console.log(instructions.length, state, instructions[state.ip])
    execInstruction(instructions, state)
  } while (!visited[state.ip])

  if(state.ip === code.length)
    return state.acc;
  return false
}

function execInstruction(code, state) {
  if(state.ip === code.length)
    return;

  const {instruction, argument} = code[state.ip]

  switch(instruction) {
    case 'acc':
      state.acc += argument
      state.ip += 1
      break;

    case 'jmp':
      state.ip += argument
      break;

    case 'nop':
      state.ip += 1
      break;
  }
}