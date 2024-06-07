let _explorerData = {
  page: 1,
  totalPage: 0,
  sortBy: '',
  sortDirection: '',
  eventSearch: '',
  contractSearch: '',
  fromSearch: '',
  networkSearch: '',
  fromDate: '',
  toDate: '',
  transactionHash: '',
  blockNumber: ''
}

const setExplorerData = (
  key: keyof typeof _explorerData,
  val: number | string
) => {
  if (!Object.keys(_explorerData).includes(key)) {
    return
  }

  _explorerData = { ..._explorerData, [key]: val }
}

const explorerData = {
  get: () => {
    return _explorerData
  },
  set: (key: keyof typeof _explorerData, val: number | string) => {
    setExplorerData(key, val)
    return explorerData
  }
}

const getExplorerData = () => {
  return _explorerData
}

export { setExplorerData, getExplorerData, explorerData }
