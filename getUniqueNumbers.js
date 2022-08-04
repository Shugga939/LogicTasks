
getUniqueNumbers([41, 55, 61, 1, 8, 27, 37, 39])  // test
getUniqueNumbers([52, 47, 95, 2, 0, 83, 68, 20])  //test


function getUniqueNumbers(array) {
  let validedArray = [...array].filter(el => typeof el === 'number')   // удаляем строки
  return recursiveSort(validedArray)
}

function recursiveSort(initialArray) {              // рекурсивная функция
  const filteredArray = filterArray(initialArray)   // фильтрация массива
  const filteredArrayLength = filteredArray.length

  if (filteredArrayLength === 1 ||              // условие выхода из рекурсии
    filteredArrayLength === 0 ||
    filteredArrayLength === initialArray.length
  ) {
    return filteredArray
  } else {                                    // патчим массив и углубляемся в рекурсию
    const upgradedArray =
      filteredArray.map(el => {
        return Math.pow(String(el).split('').reverse().join(''), 2)
      })
    return recursiveSort(upgradedArray)
  }
}

function filterArray(array) {                            // функция фильтрации
  let mutableArray = [...array].sort((a, b) => a - b)
  let itarbleIndex = 0                                    // индекс для итерации по изменяемому массиву

  while (itarbleIndex <= mutableArray.length - 1) {
    const searchedNumbers = String(mutableArray[itarbleIndex]).split('')   // массив с искомыми цифрами
    const initialLength = mutableArray.length                              // изначальная длина массива
    let isUnique = true                                                    // уникальность числа в массиве

    for (let index = 0; index < mutableArray.length; index++) {
      searchedNumbers.forEach((num => {
        if (String(mutableArray[index]).includes(num) && index !== itarbleIndex) {
          isUnique = false
          mutableArray.splice(index, 1)
          index--
        }
      }))
    }

    if (!isUnique) mutableArray.splice(itarbleIndex, 1)
    if (mutableArray.length === initialLength) itarbleIndex++
  }
  console.log(mutableArray);
  return mutableArray
}
