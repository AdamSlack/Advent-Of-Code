
const lowerLimit = 128392
const upperLimit = 643281


const possibilities = []
const doubles = RegExp('11|22|33|44|55|66|77|88|99')
const regexString = Array.from({length:9}, (_, i) => `(?<!${i+1})(${i+1}${i+1})(?!${i+1})`).join('|')
const doublesNoTriples = RegExp(regexString)
for(let a = 1; a <= 6; a++) {
    for (let b = a; b >= a && b <= 9; b++) {
        for (let c = b; c >= b && c <= 9; c++) {
            for (let d = c; d >= c && d <= 9; d++) {
                for (let e = d; e >= d && e <= 9; e++) {
                    for (let f = e; f >= e && f <= 9; f++) {
                        if(b >= a && c >= b && d >= c && e >= d && f >= e) {
                            const string = `${a}${b}${c}${d}${e}${f}`
                            if(doubles.test(string)) {
                                possibilities.push(parseInt(string, 10))
                            }
                        }
                    }
                }
            }
        }
    }
}

const withinRange = possibilities.filter((num) => num >= lowerLimit && num <= upperLimit)
const noTriples = withinRange.filter((num) => `${num}`.match(doublesNoTriples))
console.log('allowing Triples:', withinRange.length)
console.log('without Triples:', noTriples.length)

