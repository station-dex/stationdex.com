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

let _contractData = {
  contracts: [] as any[]
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

const getExplorerData = () => {
  return _explorerData
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

const contractData = {
  get: () => {
    return _contractData
  },
  getSelectedInterfaces: () => {
    const selectedContracts = _explorerData.contractSearch.split(',')

    if (!selectedContracts.length) {
      return []
    }

    if (!_contractData.contracts.length) {
      return []
    }

    const allContracts = _contractData.contracts.map(el => el.interfaceName)
    const fc = selectedContracts.filter(val => allContracts.includes(val))

    return fc
  },
  getInterfaceNames: () => {
    if (!_contractData.contracts.length) {
      return []
    }

    return _contractData.contracts.map(el => el.interfaceName)
  },
  getContractsFromInterfaces: (interfaces: string[]) => {
    if (!_contractData.contracts.length) {
      return []
    }

    const contracts = interfaces.map((val) => {
      const finder = _contractData.contracts.find(el => el.interfaceName === val)
      return finder ? finder.contracts : []
    })

    return contracts.reduce((acc, cur) => ([...acc, ...cur]), [])
  },
  getEventNamesFromInterfaces: (interfaces: string[]) => {
    if (!_contractData.contracts.length) {
      return []
    }

    const events = interfaces.map((val) => {
      const finder = _contractData.contracts.find(el => el.interfaceName === val)
      return finder ? finder.events : []
    })

    const allEvents = events.reduce((acc, cur) => ([...acc, ...cur]), [])
    return [...new Set(allEvents)]
  },
  getAllEventNames: () => {
    if (!_contractData.contracts.length) {
      return []
    }

    const allEvents = _contractData.contracts.reduce((acc, cur) => {
      return [...acc, ...cur.events]
    }, [])

    return [...new Set(allEvents)]
  },
  set: (key: keyof typeof _contractData, val: any) => {
    if (!Object.keys(_contractData).includes(key)) {
      return
    }

    _contractData = { ..._contractData, [key]: val }
    return contractData
  }
}

export { setExplorerData, getExplorerData, explorerData, contractData }
