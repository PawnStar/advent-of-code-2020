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
        current[prop] = value.trim()
      }
    }
  }

  const hasFields = passports.filter(pass => (
       pass.ecl
    && pass.pid
    && pass.eyr
    && pass.hcl
    && pass.byr
    && pass.iyr
    && pass.hgt
  ))

  // console.log(passports)

  const valid = hasFields.filter(({byr}) => {
    const yr = parseInt(byr, 10)
    return yr >= 1920 && yr <= 2020
  }).filter(({iyr}) => {
    const yr = parseInt(iyr, 10)
    return yr >= 2010 && yr <= 2020
  }).filter(({eyr}) => {
    const yr = parseInt(eyr, 10)
    return yr >= 2020 && yr <= 2030
  }).filter(({hgt}) => {
    const h = parseInt(hgt, 10)
    const unit = hgt.match('[a-z]*$')?.[0]

    if(unit === 'cm')
      return h >= 150 && h <= 193
    if(unit === 'in')
      return h >= 59 && h <= 76

    // console.log(`height failed ${hgt} ${h} ${unit} ${typeof h}`)
    return false
  }).filter(({hcl}) => {
    // console.log(`hcl ${hcl}`)
    return /^#[0-9a-f]{6}$/.test(hcl)
  }).filter(({ecl}) => {
    // console.log(`ecl ${ecl}`)
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)
  }).filter(({pid}) => {
    // console.log(`pid ${pid}`)
    return /^[0-9]{9}$/.test(pid)
  })

  return valid.length
}