module.exports = {
  indexPrime: async (req, res) => {
    let x = []
    for (let i = 2; x.length < req.query.angka; i++) {
      let isPrime = true
      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          isPrime = false
          break
        }
      }

      if (isPrime) x.push(i)
    }

    // Send the last prime number as a JSON response
    const lastPrime = x[x.length - 1]
    res.json({ lastPrime })
  },
  indexOdd: async (req, res) => {
    let x = []
    for (let i = 1; x.length < req.query.angka; i += 2) {
      x.push(i)
    }

    // Send the last odd number as a JSON response
    const lastOdd = x[x.length - 1]
    res.json({ lastOdd })
  },
  triangle: async (req, res) => {
    const angka = req.query.angka
    const angkaString = angka.toString()
    const triangle = []

    for (let i = 0; i < angkaString.length; i++) {
      const digit = parseInt(angkaString[i])
      const line =
        '0'.repeat(i) + digit.toString().repeat(angkaString.length - i)
      triangle.push(line)
    }

    res.json({ triangle })
  }
}
