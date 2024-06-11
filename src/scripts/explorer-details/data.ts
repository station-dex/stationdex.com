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
  return `
  <button data-text="${copyText}" data-state="idle" data-type="copy">
    <i></i>
  </button>
  <a href="${gotoLink}" target="_blank" rel="noopener noreferrer" >
    <button data-type="link">
      <i></i>
    </button>
  </a>
  `
}

const renderData = (data: any) => {
  const allItems = document.querySelectorAll('[data-item]') as NodeListOf<HTMLDivElement>

  for (let i = 0; i < allItems.length; i++) {
    const elem = allItems[i]

    const itemName = elem.dataset.item

    switch (itemName) {
      case 'block-number':
        elem.innerHTML = data.blockNumber
        break

      case 'event-name':
        elem.innerHTML = data.eventName
        break

      case 'network':
        elem.innerHTML = getChainDetails(parseInt(data.chainId)).name
        break

      case 'block-timestamp':{
        const unix = new Date(data.blockTimestamp)
        elem.innerHTML = `${DateLib.relativeTime(unix)} (${DateLib.fromUnix(unix).toString()})`
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
        ${renderButtons(data?.id, '/')}
        `
        break
      }

      case 'transaction-sender':{
        elem.innerHTML = `
        <p class="detail">${data?.transactionSender}</p>
        ${renderButtons(data?.id, '/')}
        `
        break
      }

      case 'id':{
        elem.innerHTML = `
        <p class="detail">${data?.id}</p>
        ${renderButtons(data?.id, '/')}
        `
        break
      }

      case 'transaction-hash':{
        elem.innerHTML = `
        <p class="detail">${data?.transactionHash}</p>
        ${renderButtons(data?.transactionHash, '/')}
        `
        break
      }

      case 'address':{
        elem.innerHTML = `
        <p class="detail">${data?.address}</p>
        ${renderButtons(data?.address, '/')}
        `
        break
      }

      default:
        break
    }
  }
}

export { explorerDetailData, renderData, getDataFromUrl }
