module.exports = input => {
  const lines = input.split('\n').filter(l => !!l).map(l => parseInt(l, 10))

  for(const a of lines) {
    for(const b of lines) {
      for(const c of lines) {
        if(a == b || b == c)
          continue;

        if(a + b + c == 2020){
          return a*b*c
        }
      }
    }
  }
}