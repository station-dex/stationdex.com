import { camelToDashCase } from '../utils/case'
import { getExplorerData } from './data'

const getDataFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const page = parseInt(urlParams.get('page') || '1')
  const sortBy = urlParams.get('sort-by') ?? ''
  const sortDirection = urlParams.get('sort-direction') ?? ''
  const eventSearch = urlParams.get('event-search') ?? ''
  const contractSearch = urlParams.get('contract-search') ?? ''
  const fromSearch = urlParams.get('from-search') ?? ''
  const networkSearch = urlParams.get('network-search') ?? ''
  const fromDate = urlParams.get('from-date') ?? ''
  const toDate = urlParams.get('to-date') ?? ''
  const transactionHash = urlParams.get('transaction-hash') ?? ''
  const blockNumber = urlParams.get('block-number') ?? ''

  return {
    page,
    sortBy,
    sortDirection,
    eventSearch,
    contractSearch,
    fromSearch,
    networkSearch,
    fromDate,
    toDate,
    transactionHash,
    blockNumber
  }
}

const buildUrlWithQueries = () => {
  const { totalPage, ...data }: Anything = getExplorerData()
  const searchParams = new URLSearchParams()

  Object.keys(data).forEach((el) => {
    if (data[el]) {
      searchParams.set(camelToDashCase(el), data[el])
    }
  })

  return `?${searchParams.toString()}`
}

const navigateSilently = (shouldReplace = false) => {
  if (shouldReplace) {
    history.replaceState(getExplorerData(), '', buildUrlWithQueries())
  } else {
    history.pushState(getExplorerData(), '', buildUrlWithQueries())
  }
}

export { getDataFromUrl, buildUrlWithQueries, navigateSilently }
