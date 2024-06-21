import { getExplorerData } from './data'

const getDataFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const page = parseInt(urlParams.get('page') || '1')
  const sortBy = urlParams.get('sortBy') ?? ''
  const sortDirection = urlParams.get('sortDirection') ?? ''
  const eventSearch = urlParams.get('eventSearch') ?? ''
  const contractSearch = urlParams.get('contractSearch') ?? ''
  const fromSearch = urlParams.get('fromSearch') ?? ''
  const networkSearch = urlParams.get('networkSearch') ?? ''
  const fromDate = urlParams.get('fromDate') ?? ''
  const toDate = urlParams.get('toDate') ?? ''
  const transactionHash = urlParams.get('transactionHash') ?? ''
  const blockNumber = urlParams.get('blockNumber') ?? ''

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
      searchParams.set(el, data[el])
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
