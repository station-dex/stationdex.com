import { initDropdown } from '@/components/DropDown/DropDown'
import { handleCopyText } from '../utils/copy'
import { explorerData } from './data'
import { fetchContacts, fetchDataAndRenderTable, fetchStatsAndRender } from './fetch'
import { buildUrlWithQueries, getDataFromUrl, navigateSilently } from './history'
import { handlePageChange } from './pagination'
import { clearDateFilter, handleDateFilter, resetSearchInputs, setupSearch } from './search'
import { handleSortClicked, resetSorting } from './sorting'
import { handleContactsFilter, handleEventFilter, initFilter } from './filter'

const explorer = document.querySelector('#explorerMain') as HTMLDivElement

explorer.addEventListener('click', async (event) => {
  const _target = event.target as HTMLElement
  let nearestButton = _target.closest('button') as HTMLButtonElement
  const nearestDiv = _target.closest("div[role='button']") as HTMLButtonElement

  if (!nearestButton && !nearestDiv) {
    return
  }

  if (!nearestButton) {
    nearestButton = nearestDiv
  }

  const { page, totalPage } = explorerData.get()
  const _buttonType = nearestButton.dataset.type

  switch (_buttonType) {
    case 'next-page':
      if (page >= totalPage) {
        return
      }

      explorerData.set('page', page + 1)
      await handlePageChange()
      break
    case 'prev-page':
      if (page <= 1) {
        return
      }

      explorerData.set('page', page - 1)
      await handlePageChange()
      break

    case 'goto-page': {
      const _gotoPage = parseInt(`${nearestButton?.dataset?.page ?? page}`)

      if (_gotoPage < 1 || _gotoPage > totalPage) {
        return
      }

      explorerData.set('page', _gotoPage)
      await handlePageChange()
      break
    }

    case 'sortable':
      handleSortClicked(nearestButton)
      break
    case 'copy':
      handleCopyText(nearestButton)
      break
    case 'date-apply':
      handleDateFilter()
      break
    case 'date-clear':
      clearDateFilter()
      break
    case 'event-dropdown-item':
      handleEventFilter(nearestButton)
      break
    case 'contract-dropdown-item':
      handleContactsFilter(nearestButton, _target)
      break
    default:
      break
  }
})

// for accessibility
explorer.addEventListener('keyup', async (event) => {
  const _target = event?.target as HTMLElement

  if (event.key === 'Enter') {
    _target?.click()
  }
})

window.onpopstate = async (e) => {
  Object.keys(e.state).forEach((el: Anything) => {
    explorerData.set(el, e.state[el])
  })
  resetSearchInputs()
  await fetchDataAndRenderTable()
  resetSorting()
};

// invocations
(async () => {
  // load data to explorer singleton
  const { page, sortBy, sortDirection, eventSearch, contractSearch, fromSearch, networkSearch, fromDate, toDate, transactionHash, blockNumber } = getDataFromUrl()
  explorerData
    .set('page', page)
    .set('sortBy', sortBy)
    .set('sortDirection', sortDirection)
    .set('eventSearch', eventSearch)
    .set('contractSearch', contractSearch)
    .set('fromSearch', fromSearch)
    .set('networkSearch', networkSearch)
    .set('fromDate', fromDate)
    .set('toDate', toDate)
    .set('transactionHash', transactionHash)
    .set('blockNumber', blockNumber)

  await Promise.all([fetchStatsAndRender(), fetchContacts()])

  setupSearch()
  initDropdown()
  initFilter()

  await fetchDataAndRenderTable()

  resetSorting()

  if (buildUrlWithQueries() !== '?page=1') {
    navigateSilently(true)
  }
})()
