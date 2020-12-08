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

  const visited = {}
  const state = {ip: 0, acc: 0}

  do {
    visited[state.ip] = true
    console.log(state, instructions[state.ip])
    execInstruction(instructions, state)
  } while (!visited[state.ip])

  return state.acc
}

function execInstruction(code, state) {
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