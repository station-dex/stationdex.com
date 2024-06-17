import { DateLib } from '@/util/date'
import { getChainDetails } from '../utils/chain'

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
        <a rel="noopener noreferrer" target="_blank" class="goto" href="${chainDetails.explorer}/tx/${data.transactionHash}">
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
        ${renderButtons(data?.id, `${chainDetails.explorer}/address/${data?.transactionSender}`)}
        `
        break
      }

      case 'to':{
        elem.innerHTML = `
        <p class="detail">Protocol (${data?.address})</p>
        ${renderButtons(data?.address, `${chainDetails.explorer}/address/${data?.address}`)}
        `
        break
      }

      case 'transaction-sender':{
        elem.innerHTML = `
        <p class="detail">${data?.transactionSender}</p>
        ${renderButtons(data?.id, `${chainDetails.explorer}/address/${data?.transactionSender}`)}
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
        ${renderButtons(data?.transactionHash, `${chainDetails.explorer}/tx/${data?.transactionHash}`)}
        `
        break
      }

      case 'address':{
        elem.innerHTML = `
        <p class="detail">${data?.address}</p>
        ${renderButtons(data?.address, `${chainDetails.explorer}/address/${data?.address}`)}
        `
        break
      }

      case 'amount0':{
        elem.innerHTML = `
        <p>${data?.amount0}</p>
        `
        break
      }

      case 'amount1':{
        elem.innerHTML = `
        <p>${data?.amount1}</p>
        `
        break
      }

      case 'gas-price':{
        elem.innerHTML = `
        <p>${data?.gasPrice}</p>
        `
        break
      }

      default:
        break
    }
  }
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
