import { closeDropdown } from '@/components/DropDown/DropDown'
import { contractData, getExplorerData, setExplorerData } from './data'
import { fetchDataAndRenderTable } from './fetch'
import { navigateSilently } from './history'

const listWrapper = document.querySelector('#contractList') as HTMLDivElement
const eventWrapper = document.querySelector('#eventList') as HTMLDivElement
const eventSearchInput = document.querySelector('#eventSearch') as HTMLInputElement
const contractSearchInput = document.querySelector('#contractSearch') as HTMLInputElement

const handleFilter = () => {
  // reset page 1 on each search
  setExplorerData('page', 1)
  //
  fetchDataAndRenderTable()
  navigateSilently()
}

const renderContractList = () => {
  if (!listWrapper) {
    return
  }

  const _contracts = contractData.getInterfaceNames()

  listWrapper.innerHTML = `
    <div class="checkbox option" data-type="contract-dropdown-item" data-value="all" role="button">
      <input data-contract-value="all" type="checkbox" checked />
      <span>Select All</span>
    </div>
  `

  _contracts.forEach((elem) => {
    listWrapper.innerHTML += `
      <div class="checkbox option" data-type="contract-dropdown-item" data-value="${elem}" role="button">
        <input data-contract-value="${elem}" type="checkbox" />
        <span>${elem}</span>
      </div>
    `
  })
}

const renderEventList = () => {
  if (!eventWrapper) {
    return
  }

  const _events = contractData.getAllEventNames()

  eventWrapper.innerHTML = ''

  _events.forEach((elem) => {
    eventWrapper.innerHTML += `
      <div class="checkbox option" tabindex="0" data-type="event-dropdown-item" data-event-value="${elem}" role="button">
        <span>${elem}</span>
      </div>
    `
  })
}

const resetEventSelection = () => {
  const eventItems = document.querySelectorAll("div[data-type='event-dropdown-item']")
  eventItems.forEach(item => item.classList.remove('active'))
}

const resetContactSelection = () => {
  const contractItems = document.querySelectorAll('input[data-contract-value]') as NodeListOf<HTMLInputElement>
  contractItems.forEach((item) => {
    item.checked = false
  })
}

const resetContactSelectAll = () => {
  const selectAllInput = document.querySelector("input[data-contract-value='all']") as HTMLInputElement

  if (!selectAllInput) {
    return
  }

  selectAllInput.checked = false
}

const getSelectedCheckbox = () => {
  const selectAllInput = document.querySelectorAll('input[data-contract-value]') as NodeListOf<HTMLInputElement>
  const selectedNames = [] as string[]
  selectAllInput.forEach((elem) => {
    if (elem.checked) {
      selectedNames.push(elem.dataset.contractValue ?? '')
    }
  })

  return selectedNames.filter(value => !!value && value !== 'all')
}

const handleEventFilter = (selectedEvent: HTMLButtonElement) => {
  if (!selectedEvent) {
    return
  }

  let value = selectedEvent.dataset.eventValue
  const isActive = selectedEvent.classList.contains('active')

  if (!value) {
    return
  }

  if (isActive) {
    value = ''
  }

  eventSearchInput.value = value
  setExplorerData('eventSearch', value)

  resetEventSelection()

  if (!isActive) {
    selectedEvent.classList.add('active')
  }

  closeDropdown('events')

  handleFilter()
}

const handleContactsFilter = (selectedEvent: HTMLButtonElement, clickTarget: HTMLElement) => {
  if (!selectedEvent) {
    return
  }

  const input = selectedEvent.querySelector("input[type='checkbox']") as HTMLInputElement

  if (!input) {
    return
  }

  const nextState = clickTarget.tagName === 'INPUT' ? input.checked : !input.checked

  const value = selectedEvent.dataset.value
  input.checked = nextState

  if (value === 'all') {
    resetContactSelection()
    input.checked = true
  }

  if (value !== 'all') {
    resetContactSelectAll()
  }

  const contractVal = getSelectedCheckbox()
  setExplorerData('contractSearch', contractVal.join(','))
  contractSearchInput.value = contractVal.length ? `${contractVal.length} contracts selected` : ''

  handleFilter()
  // set value and search
}

const initContractFilter = () => {
  const selectedInterfaces = contractData.getSelectedInterfaces()

  if (!selectedInterfaces.length) {
    return
  }

  resetContactSelectAll()

  const contractItems = document.querySelectorAll('input[data-contract-value]') as NodeListOf<HTMLInputElement>
  contractItems.forEach((item) => {
    const val = item.dataset.contractValue

    if (val && selectedInterfaces.includes(val)) {
      item.checked = true
    }
  })
}

const initEventFilter = () => {
  const { eventSearch } = getExplorerData()

  if (!eventSearch) {
    return
  }

  const eventItem = document.querySelector(`[data-event-value='${eventSearch}']`) as HTMLInputElement

  if (!eventItem) {
    return
  }

  eventItem.classList.add('active')
}

const initFilter = () => {
  initContractFilter()
  initEventFilter()
}

export { renderContractList, renderEventList, handleEventFilter, handleContactsFilter, initFilter }
