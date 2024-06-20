import { DateLib } from '@/util/date'
import { getAddressLink, getChainDetails, getTxHashLink } from '../utils/chain'
import { convertToGwei } from '../explorer/utils'

let _explorerDetailsData = {
  id: ''
}

const setExplorerData = (
  key: keyof typeof _explorerDetailsData,
  val: string
) => {
  if (!Object.keys(_explorerDetailsData).includes(key)) {
    return
  }

  _explorerDetailsData = { ..._explorerDetailsData, [key]: val }
}

const explorerDetailData = {
  get: () => {
    return _explorerDetailsData
  },
  set: (key: keyof typeof _explorerDetailsData, val: string) => {
    setExplorerData(key, val)
    return explorerDetailData
  }
}

const getDataFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id') || ''
  return {
    id
  }
}

const renderButtons = (copyText: string, gotoLink: string) => {
  let _buttons = `
    <button data-text="${copyText}" data-state="idle" data-type="copy">
      <i></i>
    </button>
  `

  if (gotoLink.length) {
    _buttons += `
      <a href="${gotoLink}" target="_blank" rel="noopener noreferrer" >
        <button data-type="link">
          <i></i>
        </button>
      </a>
    `
  }

  return _buttons
}

const renderArrowIcon = () => {
  return `
  <i> 
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  </i>
  `
}

const renderExtraData = (data: any) => {
  const extraField = document.querySelector('#extraDataFields') as HTMLDivElement

  if (!extraField) {
    return
  }

  extraField.innerHTML = ''

  const excludedKeys = ['blockNumber', 'eventName', 'chainId', 'blockTimestamp', 'transactionHash', 'transactionSender', 'id', 'interfaceName', 'address', 'gasPrice']
  const isAddressFields = ['contract', 'sender', 'recipient', 'sentTo']

  Object.keys(data).forEach((key) => {
    if (!excludedKeys.includes(key)) {
      if (isAddressFields.includes(key)) {
        extraField.innerHTML += `
        <div class="item">
          <aside class="left">
            <p>${key}</p>
          </aside>
          <aside class="right">
            <div class="with actions">
              <p>${data[key]}</p>
              ${renderButtons(data[key], getAddressLink(parseInt(data.chainId), data[key]))}
            </div>
          </aside>
        </div>
        `
      } else {
        extraField.innerHTML += `
        <div class="item">
          <aside class="left">
            <p>${key}</p>
          </aside>
          <aside class="right">
            <p>${data[key]}</p>
          </aside>
        </div>
        `
      }
    }
  })
}

const renderData = (data: any) => {
  const allItems = document.querySelectorAll('[data-item]') as NodeListOf<HTMLDivElement>

  for (let i = 0; i < allItems.length; i++) {
    const elem = allItems[i]

    const itemName = elem.dataset.item
    const chainDetails = getChainDetails(parseInt(data.chainId))

    switch (itemName) {
      case 'block-number':
        elem.innerHTML = data.blockNumber
        break

      case 'event-name':
        elem.innerHTML = data.eventName
        break

      case 'network':
        elem.innerHTML = chainDetails.name
        break

      case 'block-timestamp':{
        const unix = new Date(data.blockTimestamp)
        elem.innerHTML = `${DateLib.relativeTime(unix)} (${DateLib.fromUnix(unix).toString()})`
        break
      }

      case 'event-detail':{
        elem.innerHTML = `
        <h1 class="title">${data.eventName}</h1>
        <p class="detail">${data.transactionHash}</p>
        <a rel="noopener noreferrer" target="_blank" class="goto" href="${getTxHashLink(parseInt(data.chainId), data.transactionHash)}">
          View on ${chainDetails.explorerName}
          ${renderArrowIcon()}
        </a>
        `
        break
      }

      case 'age':{
        const unix = new Date(data.blockTimestamp)
        elem.innerHTML = `${DateLib.relativeTime(unix)} (${DateLib.fromUnix(unix).toString()})`
        break
      }

      case 'from':{
        elem.innerHTML = `
        <p class="detail">${data?.transactionSender}</p>
        ${renderButtons(data?.id, getAddressLink(parseInt(data.chainId), data?.transactionSender))}
        `
        break
      }

      case 'to':{
        elem.innerHTML = `
        <p class="detail">${data?.contract}</p>
        ${renderButtons(data?.contract, getAddressLink(parseInt(data.chainId), data?.contract))}
        `
        break
      }

      case 'transaction-sender':{
        elem.innerHTML = `
        <p class="detail">${data?.transactionSender}</p>
        ${renderButtons(data?.id, getAddressLink(parseInt(data.chainId), data?.transactionSender))}
        `
        break
      }

      case 'id':{
        elem.innerHTML = `
        <p class="detail">${data?.id}</p>
        ${renderButtons(data?.id, '')}
        `
        break
      }

      case 'transaction-hash':{
        elem.innerHTML = `
        <p class="detail">${data?.transactionHash}</p>
        ${renderButtons(data?.transactionHash, getTxHashLink(parseInt(data.chainId), data?.transactionHash))}
        `
        break
      }

      case 'address':{
        elem.innerHTML = `
        <p class="detail">${data?.interfaceName} (${data?.address})</p>
        ${renderButtons(data?.address, getAddressLink(parseInt(data.chainId), data?.address))}
        `
        break
      }

      case 'gas-price':{
        elem.innerHTML = `
        <p data-tooltip="${data?.gasPrice}">${`${convertToGwei(data?.gasPrice || 0)} Gwei`}</p>
        `
        break
      }

      default:
        break
    }
  }

  renderExtraData(data)
}

const setExplorerLoading = (
  enable: boolean
) => {
  const allItems = document.querySelectorAll('[data-loading]')

  if (!allItems.length) {
    return
  }

  allItems.forEach((element) => {
    if (enable) {
      element.classList.add('shimmer')
    } else {
      element.classList.remove('shimmer')
    }
  })
}

const handleFetchError = () => {
  const errorContainer = document.querySelector('#explorerError')
  const successContainer = document.querySelector('#explorerLoaded')
  const errorHash = document.querySelector('#errorTransactionHash')

  if (errorContainer && successContainer && errorHash) {
    errorContainer.classList.remove('hidden')
    successContainer.classList.add('hidden')
    errorHash.innerHTML = _explorerDetailsData.id
  }
}

export { explorerDetailData, renderData, getDataFromUrl, setExplorerLoading, handleFetchError }
