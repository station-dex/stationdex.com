import { getExplorerData, setExplorerData } from './data'
import { fetchDataAndRenderTable } from './fetch'
import { navigateSilently } from './history'

const removeSortingFromAllColumns = () => {
  const allSortIcons = document.querySelectorAll('i.sort-icon')

  for (let i = 0; i < allSortIcons.length; i++) {
    allSortIcons[i].classList.remove('asc')
    allSortIcons[i].classList.remove('desc')
    const sortButton = allSortIcons[i].closest('button')

    if (sortButton) {
      sortButton.dataset.sort = 'neutral'
    }
  }
}

const handleSort = (sortButton: HTMLButtonElement, sortDirection: string) => {
  // reset all sort icons
  removeSortingFromAllColumns()
  //

  const sortIcon = sortButton.querySelector('i.sort-icon')

  sortIcon?.classList.remove('asc')
  sortIcon?.classList.remove('desc')

  if (sortDirection === 'neutral') {
    sortButton.dataset.sort = 'neutral'
  }

  if (sortDirection === 'asc') {
    sortButton.dataset.sort = 'asc'
    sortIcon?.classList.add('asc')
    sortIcon?.classList.remove('desc')
  }

  if (sortDirection === 'desc') {
    sortButton.dataset.sort = 'desc'
    sortIcon?.classList.add('desc')
    sortIcon?.classList.remove('asc')
  }
}

const handleSortClicked = async (clickedButton: HTMLButtonElement) => {
  const currentSort = clickedButton.dataset.sort
  let nextSort = currentSort ?? ''
  const sortKey = clickedButton.dataset.tableColumn ?? ''

  if (currentSort === 'neutral') {
    handleSort(clickedButton, 'asc')
    nextSort = 'asc'
  }

  if (currentSort === 'asc') {
    handleSort(clickedButton, 'desc')
    nextSort = 'desc'
  }

  if (currentSort === 'desc') {
    handleSort(clickedButton, 'neutral')
    nextSort = ''
  }

  setExplorerData('sortDirection', nextSort)
  setExplorerData('sortBy', nextSort ? sortKey : '')

  await fetchDataAndRenderTable()
  navigateSilently()
}

const resetSorting = () => {
  const { sortDirection, sortBy } = getExplorerData()

  removeSortingFromAllColumns()

  if (!sortBy) {
    return
  }

  if (!['asc', 'desc'].includes(sortDirection)) {
    return
  }

  const actualButton = document.querySelector(`button[data-table-column='${sortBy}']`) as HTMLButtonElement

  if (!actualButton) {
    return
  }

  handleSort(actualButton, sortDirection)
}

export { handleSort, resetSorting, handleSortClicked }
