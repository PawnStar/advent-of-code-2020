module.exports = input => {
  let passports = []
  const lines = ['', ...input.split('\n')]
  let current = null

  for(const line of lines) {
    if(line.trim().length < 1){
      if(current) passports.push(current)
      current = {}
    } else {
      const fields = line.split(' ')

      for(const field of fields){
        const [prop, value] = field.split(':')
        current[prop] = value
      }
    }
  }

  return passports.filter(pass => (
       pass.ecl
    && pass.pid
    && pass.eyr
    && pass.hcl
    && pass.byr
    && pass.iyr
    && pass.hgt
  )).length
}