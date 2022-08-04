showMultiolicationTable(3)
showMultiolicationTable(9)
showMultiolicationTable(11)
showMultiolicationTable(19)
showMultiolicationTable(25)
showMultiolicationTable(30)
showMultiolicationTable(35)
showMultiolicationTable(50)    //tests

function showMultiolicationTable(raisedNumber) {
  let table = ''
  let multipierRow = ' '                  // строка множителя (верх)
  let resultRow = ''                      // результат умножения
  let memoObject = {}                     // объект для мемоизации
  const [firstTwoDigitMultipier,          // множители при умножении на которые,
    firstThreeDigitMultipier,             // в результате получаем первые 2х, 3х, 4х -значные результаты
    firstFourDigitMultipier] = getFirstMultipleNumbers(raisedNumber)

  if (raisedNumber < 1 || raisedNumber == undefined) return

  for (let num = 1; num <= raisedNumber; num++) {     //num- левые множители
    if (!memoObject[num]) memoObject[num] = {}
    resultRow += getLeftColumnElement(raisedNumber, num)
    multipierRow += getMultipierElement(
      num,
      firstTwoDigitMultipier,
      firstThreeDigitMultipier,
      firstFourDigitMultipier
    )
    for (let multipier = 1; multipier <= raisedNumber; multipier++) { // multipier- верхние множители
      const result = resultMemo(num, multipier, memoObject)

      resultRow +=
        getResultElement(
          result,
          multipier,
          firstTwoDigitMultipier,
          firstThreeDigitMultipier,
          firstFourDigitMultipier
        )
    }
    resultRow += '\n'
  }
  table += multipierRow + '\n'
  table += '-'.repeat(multipierRow.length) + '\n'    // строка под множителями
  table += resultRow

  console.log(table);
}


function resultMemo(num, multipier, memoObject) {  // мемоизация или извлечение результата
  if (memoObject[multipier] && memoObject[multipier][num]) {
    return memoObject[multipier][num]
  } else {
    memoObject[num][multipier] = num * multipier
    return memoObject[num][multipier]
  }
}


function getLeftColumnElement(raisedNumber, num) {        // ширина елементов в левой 
  if (raisedNumber < 10 && num < 10) {                    // колонке с множителями
    return `${num}|`
  } else if ((raisedNumber > 9 && raisedNumber < 100) && num > 9) {
    return `${num}|`
  } else {
    return ` ${num}|`
  }
}

function getMultipierElement(   // ширина елементов в строке верхних множителей
  num,
  firstTwoDigitMultipier,
  firstThreeDigitMultipier,
  firstFourDigitMultipier
) {
  if (num >= firstFourDigitMultipier && firstFourDigitMultipier) {
    return `   ${num}`
  }

  if (num >= firstThreeDigitMultipier && firstThreeDigitMultipier) {
    if (num === firstThreeDigitMultipier && num < 10) return `   ${num}`
    if (num < 10) return `   ${num}`
    return `  ${num}`
  }

  if (num >= firstTwoDigitMultipier && firstTwoDigitMultipier) {
    if (num === 1) return `   ${num}`
    if (firstTwoDigitMultipier === num) return `  ${num}`
    return `  ${num}`
  }

  return ` ${num}`
}

function getResultElement(    // ширина елементов в области результатов
  result,
  multipier,
  firstTwoDigitMultipier,
  firstThreeDigitMultipier,
  firstFourDigitMultipier
) {

  if (firstFourDigitMultipier) {
    return getStringForFourDigitValues(
      multipier, firstThreeDigitMultipier, firstFourDigitMultipier, result
    )
  }

  if (firstThreeDigitMultipier) {
    return getStringForThreeDigitValues(
      multipier, firstThreeDigitMultipier, result
    )
  }

  return getStringForTwoDigitValues(
    multipier, firstTwoDigitMultipier, result
  )
}


function getStringForTwoDigitValues(    // получение ширины, если в таблице
  multipier,                            // имеются двухзначные значения
  firstTwoDigitMultipier,
  result,
) {
  if (multipier >= firstTwoDigitMultipier && firstTwoDigitMultipier) {
    if (result < 10) return ` ${result} `
    if (result >= 10) return `${result} `
  }

  if (result < 10) return `${result} `
  return `${result} `
}


function getStringForThreeDigitValues(    // получение ширины, если в таблице
  multipier,                              // имеются трехзначные значения
  firstThreeDigitMultipier,
  result,
) {
  if (multipier >= firstThreeDigitMultipier) {
    if (result < 10) return `  ${result} `
    if (result >= 10 && result < 100) return ` ${result} `
  }

  if (result < 10) return ` ${result} `
  return `${result} `
}


function getStringForFourDigitValues(   // получение ширины, если в таблице
  multipier,                            // имеются четырехзначные значения
  firstThreeDigitMultipier,
  firstFourDigitMultipier,
  result,
) {
  if (multipier >= firstThreeDigitMultipier &&
    multipier < firstFourDigitMultipier
  ) {
    if (result < 10) return `  ${result} `
    if (result >= 10 && result < 100) return ` ${result} `
  }

  if (multipier >= firstFourDigitMultipier) {
    if (result < 10) return `   ${result} `
    if (result >= 10 && result < 100) return `  ${result} `
    if (result >= 100 && result < 1000) return ` ${result} `
    if (result >= 1000) return `${result} `
  }

  if (result < 10) return ` ${result} `
  return `${result} `
}


function getFirstMultipleNumbers(raisedNumber) {
  let firstTwoDigitMultipier = null
  let firstThreeDigitMultipier = null
  let firstFourDigitMultipier = null

  for (let multipier = 1; multipier <= raisedNumber; multipier++) {
    const result = multipier * raisedNumber
    if (result >= 10) {
      if (!firstTwoDigitMultipier) firstTwoDigitMultipier = multipier
    }

    if (result >= 100) {
      if (!firstThreeDigitMultipier) firstThreeDigitMultipier = multipier
      if (raisedNumber < 31) break
    }

    if (result >= 1000) {
      if (!firstFourDigitMultipier) firstFourDigitMultipier = multipier
      break
    }
  }
  return [
    firstTwoDigitMultipier,
    firstThreeDigitMultipier,
    firstFourDigitMultipier
  ]
}
