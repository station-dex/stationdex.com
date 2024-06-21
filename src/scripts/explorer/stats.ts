import { convertToGwei, formatNumber } from './utils'

const allStatsList = document.querySelectorAll('#explorerMain .stats .item')

const setStatsLoading = () => {
  for (let i = 0; i < allStatsList.length; i++) {
    allStatsList[i].classList.add('shimmer')
  }
}

const removeStatsLoading = () => {
  for (let i = 0; i < allStatsList.length; i++) {
    allStatsList[i].classList.remove('shimmer')
  }
}

const calculateGasPriceChange = (totalAvg: number, todayAverage: number) => {
  let isPositive = true

  if (todayAverage < totalAvg) {
    isPositive = false
  }

  let percent

  if (isPositive) {
    percent = ((todayAverage - totalAvg) / todayAverage) * 100
  } else {
    percent = ((totalAvg - todayAverage) / totalAvg) * 100
  }

  if (isNaN(percent)) {
    percent = 0
  }

  return {
    percent: percent.toFixed(2),
    isPositive
  }
}

const renderStatsValue = (payload: Anything) => {
  const transaction = allStatsList[0].querySelector('.value')
  const swaps = allStatsList[1].querySelector('.value')
  const liquidityAdded = allStatsList[2].querySelector('.value')
  const liquidityRemoved = allStatsList[3].querySelector('.value')
  const averageGas = allStatsList[4].querySelector('p.value.main')

  const changeDiv = allStatsList[4].querySelector('div.changes')
  const changeValue = allStatsList[4].querySelector('p.value.change')

  const gasPriceChange = calculateGasPriceChange(payload.averageGasPrice, payload.averageGasPriceToday)

  if (transaction) {
    transaction.innerHTML = formatNumber(payload.transactionCount)
  }

  if (swaps) {
    swaps.innerHTML = formatNumber(payload.totalSwaps)
  }

  if (liquidityAdded) {
    liquidityAdded.innerHTML = formatNumber(payload.liquidityAdded)
  }

  if (liquidityRemoved) {
    liquidityRemoved.innerHTML = formatNumber(payload.liquidityRemoved)
  }

  if (averageGas) {
    averageGas.innerHTML = `${convertToGwei(payload.averageGasPrice)} Gwei`
  }

  if (changeValue) {
    changeValue.innerHTML = `${gasPriceChange.percent}%`
  }

  if (changeDiv) {
    if (gasPriceChange.isPositive) {
      changeDiv.classList.remove('negative')
    } else {
      changeDiv.classList.add('negative')
    }
  }
}

export { setStatsLoading, removeStatsLoading, renderStatsValue }
