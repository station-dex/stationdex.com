import { contractData, getExplorerData, setExplorerData } from './data'
import { renderContractList, renderEventList } from './filter'
import { resetPagination } from './pagination'
import { setStatsLoading, removeStatsLoading, renderStatsValue } from './stats'
import { buildTableBody, buildTableBodyForError, setTableLoading } from './table'

const baseUrl = 'server' in window ? window.server : ''
const chainId = 'chainId' in window ? window.chainId : ''

const getRequestBody = () => {
  const { page, sortBy, sortDirection, eventSearch, contractSearch, fromSearch, networkSearch, fromDate, toDate, transactionHash, blockNumber } = getExplorerData()

  const _body: any = {
    pageNumber: page,
    pageSize: 25
  }

  if (sortBy) {
    _body.sortBy = sortBy
  }

  if (sortDirection) {
    _body.sortDirection = sortDirection.toUpperCase()
  }

  if (eventSearch) {
    _body.eventSearch = eventSearch
  }

  if (contractSearch) {
    _body.contracts = contractData.getContractsFromInterfaces(contractSearch.split(','))
  }

  if (fromSearch) {
    _body.fromAddressSearch = fromSearch
  }

  if (networkSearch) {
    _body.chains = [parseInt(networkSearch)]
  }

  if (fromDate) {
    _body.dateFrom = `${fromDate}T00:00:00.000Z`
  }

  if (toDate) {
    _body.dateTo = `${toDate}T23:59:59.999Z`
  }

  if (transactionHash) {
    _body.transactionHashSearch = transactionHash
  }

  if (blockNumber) {
    _body.blockNumberSearch = blockNumber
  }

  return _body
}

const fetchContacts = async () => {
  try {
    const _data = await fetch(`${baseUrl}explorer/${chainId}/contracts`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
    const _json = await _data.json()

    contractData.set('contracts', _json.data)

    renderContractList()
    renderEventList()
  } catch (e) {
    console.error('Error fetching explorer home response', e)
  }
}

const fetchDataAndRenderTable = async () => {
  try {
    setTableLoading()

    const _data = await fetch(`${baseUrl}explorer/${chainId}/home`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(getRequestBody())
    })

    const _json = await _data.json()

    const _totalPage = _json?.data?.totalPages ?? 1

    buildTableBody(_json?.data?.items ?? [])
    setExplorerData('totalPage', _totalPage)
    resetPagination()

    if (!_data.ok) {
      const errMessage = _json?.data?.errorMessage ?? _json?.message ?? 'Could not complete request'
      buildTableBodyForError(errMessage)
    }
  } catch (e) {
    console.error('Error fetching explorer home response', e)
  }
}

const fetchStatsAndRender = async () => {
  try {
    // set loading
    setStatsLoading()

    const _data = await fetch(`${baseUrl}explorer/${chainId}/home/stats`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
    const _json = await _data.json()
    //   reset loading
    renderStatsValue(_json.data)
    //
    removeStatsLoading()
  } catch (e) {
    console.error('Error fetching explorer home response', e)
  }
}

export { fetchDataAndRenderTable, fetchStatsAndRender, fetchContacts }
