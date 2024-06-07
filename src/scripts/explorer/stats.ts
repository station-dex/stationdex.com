import { formatNumber } from "./utils";

const allStatsList = document.querySelectorAll('#explorerMain .stats .item')

const setStatsLoading = () => {
  for(let i = 0; i< allStatsList.length; i++){
    allStatsList[i].classList.add("shimmer")
  }
};

const removeStatsLoading = () => {
  for(let i = 0; i< allStatsList.length; i++){
    allStatsList[i].classList.remove("shimmer")
  }
};

const convertToGwei = (num: number)=>{
  return formatNumber(num / Math.pow(10, 9))
}

const calculateGasPriceChange = (totalAvg: number, todayAverage: number) => {
  let isPositive = true;
  if (todayAverage < totalAvg) isPositive = false;
  let percent;
  if (isPositive) {
    percent = ((todayAverage - totalAvg) / todayAverage) * 100;
  } else {
    percent = ((totalAvg - todayAverage) / totalAvg) * 100;
  }
  return {
    percent: percent.toFixed(2),
    isPositive,
  };
};

const renderStatsValue = (payload: any) => {
  const transaction = allStatsList[0].querySelector('.value')
  const swaps = allStatsList[1].querySelector('.value')
  const liquidityAdded = allStatsList[2].querySelector('.value')
  const liquidityRemoved = allStatsList[3].querySelector('.value')
  const average_gas = allStatsList[4].querySelector('p.value.main')

  const changeDiv = allStatsList[4].querySelector('div.changes');
  const changeValue = allStatsList[4].querySelector('p.value.change');

  const gasPriceChange = calculateGasPriceChange(payload.average_gas_price, payload.average_gas_price_today);

  if(transaction) transaction.innerHTML = formatNumber(payload.transaction_count)
  if(swaps) swaps.innerHTML = formatNumber(payload.total_swaps)
  if(liquidityAdded) liquidityAdded.innerHTML = formatNumber(payload.liquidity_added)
  if(liquidityRemoved) liquidityRemoved.innerHTML = formatNumber(payload.liquidity_removed)
  if(average_gas) average_gas.innerHTML = `${convertToGwei(payload.average_gas_price)} Gwei`
  if(changeValue) changeValue.innerHTML = `${gasPriceChange.percent}%`
  if(changeDiv){
    if(gasPriceChange.isPositive) changeDiv.classList.remove('negative')
    else changeDiv.classList.add('negative')
  }
};

export { setStatsLoading, removeStatsLoading, renderStatsValue}