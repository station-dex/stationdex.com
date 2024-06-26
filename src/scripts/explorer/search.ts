import { debounce } from '@/util/debounce'
import { contractData, getExplorerData, setExplorerData } from './data'
import { fetchDataAndRenderTable } from './fetch'
import { etherAddressBasicValidate } from './utils'
import { navigateSilently } from './history'

let fromSearchQuery = ''
let txnHashSearchQuery = ''
let blockNumberSearchQuery = ''

const eventSearchInput = document.querySelector('#eventSearch') as HTMLInputElement
const contractSearchInput = document.querySelector('#contractSearch') as HTMLInputElement
const fromAddressSearchInput = document.querySelector('#transactionSenderSearch') as HTMLInputElement
const networkSearchInput = document.querySelector('#networkSearch') as HTMLInputElement
const txnHashSearchInput = document.querySelector('#transactionHashSearch') as HTMLInputElement
const blockNumberSearchInput = document.querySelector('#blockSearch') as HTMLInputElement

const fromDateInput = document.querySelector('#fromDateSearch') as HTMLInputElement
const toDateInput = document.querySelector('#toDateSearch') as HTMLInputElement
const filterDatePlaceholder = document.querySelector('#filterDatePlaceholder') as HTMLInputElement

const handleSearch = () => {
  // reset page 1 on each search
  setExplorerData('page', 1)
  //
  fetchDataAndRenderTable()
  navigateSilently()
}

const setupFromSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (fromSearchQuery !== searchQuery) {
      fromSearchQuery = searchQuery

      if (etherAddressBasicValidate(searchQuery)) {
        setExplorerData('fromSearch', searchQuery)
        handleSearch()
      }
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value
    searchDebounce(inputValue)
  }

  fromAddressSearchInput?.addEventListener(
    'keyup',
    onKeyup,
    { passive: true }
  )
}

const initiateDateFilter = () => {
  const { fromDate, toDate } = getExplorerData()
  fromDateInput.value = fromDate
  toDateInput.value = toDate

  if (filterDatePlaceholder) {
    filterDatePlaceholder.value = `${fromDateInput.value} - ${toDateInput.value}`
  }

  const btnClear = document.querySelector("button[data-type='date-clear']")
  const btnApply = document.querySelector("button[data-type='date-apply']")

  if (btnClear && btnApply) {
    btnClear.classList.remove('hidden')
    btnApply.classList.add('hidden')
  }
}

const resetSearchInputs = () => {
  const { eventSearch, fromSearch, networkSearch, fromDate, toDate, transactionHash, blockNumber } = getExplorerData()

  if (eventSearchInput) {
    const allEvents = contractData.getAllEventNames()

    if (allEvents.includes(eventSearch)) {
      eventSearchInput.value = eventSearch
    } else {
      setExplorerData('eventSearch', '')
    }
  }

  if (contractSearchInput) {
    const totalSelectedContracts = contractData.getSelectedInterfaces().length
    contractSearchInput.value = totalSelectedContracts ? `${totalSelectedContracts} contracts selected` : ''
  }

  if (fromAddressSearchInput) {
    fromAddressSearchInput.value = fromSearch
    fromSearchQuery = fromSearch
  }

  if (networkSearchInput) {
    networkSearchInput.value = networkSearch
  }

  if (txnHashSearchInput) {
    txnHashSearchInput.value = transactionHash
    txnHashSearchQuery = transactionHash
  }

  if (blockNumberSearchInput) {
    blockNumberSearchInput.value = blockNumber
    blockNumberSearchQuery = blockNumber
  }

  if (fromDate && toDate) {
    initiateDateFilter()
  }
}

const setupBlockSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (blockNumberSearchQuery !== searchQuery) {
      blockNumberSearchQuery = searchQuery

      if (!searchQuery || searchQuery.length > 2) {
        setExplorerData('blockNumber', searchQuery)
        handleSearch()
      }
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value
    searchDebounce(inputValue ?? '')
  }

  blockNumberSearchInput?.addEventListener(
    'keyup',
    onKeyup,
    { passive: true }
  )
}

const setupTxnHashSearch = (): void => {
  const searchDebounce = debounce((searchQuery: string) => {
    if (txnHashSearchQuery !== searchQuery) {
      txnHashSearchQuery = searchQuery

      if (etherAddressBasicValidate(searchQuery)) {
        setExplorerData('transactionHash', searchQuery)
        handleSearch()
      }
    }
  }, 500)

  const onKeyup = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value
    searchDebounce(inputValue ?? '')
  }

  txnHashSearchInput?.addEventListener(
    'keyup',
    onKeyup,
    { passive: true }
  )
}

const handleDateFilter = () => {
  if (!fromDateInput.value || !toDateInput.value) {
    return
  }

  setExplorerData('toDate', toDateInput.value)
  setExplorerData('fromDate', fromDateInput.value)

  if (filterDatePlaceholder) {
    filterDatePlaceholder.value = `${fromDateInput.value} - ${toDateInput.value}`
  }

  handleSearch()

  const btnClear = document.querySelector("button[data-type='date-clear']")
  const btnApply = document.querySelector("button[data-type='date-apply']")

  if (btnClear && btnApply) {
    btnClear.classList.remove('hidden')
    btnApply.classList.add('hidden')
  }
}

const clearDateFilter = () => {
  setExplorerData('toDate', '')
  setExplorerData('fromDate', '')

  if (filterDatePlaceholder) {
    filterDatePlaceholder.value = ''
  }

  if (fromDateInput) {
    fromDateInput.value = ''
  }

  if (toDateInput) {
    toDateInput.value = ''
  }

  handleSearch()

  const btnClear = document.querySelector("button[data-type='date-clear']")
  const btnApply = document.querySelector("button[data-type='date-apply']")

  if (btnClear && btnApply) {
    btnClear.classList.add('hidden')
    btnApply.classList.remove('hidden')
  }
}

const setupSearch = (): void => {
  resetSearchInputs()
  setupFromSearch()
  setupBlockSearch()
  setupTxnHashSearch()
}

export { setupSearch, resetSearchInputs, handleDateFilter, clearDateFilter }
