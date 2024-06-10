import { DateLib } from '@/util/date.js'
import { abbreviateAddress, getChainDetails } from './utils'
const _tableBody = document.querySelector('#explorer-table-body')

const buildTableBody = (data: any[]) => {
  if (!_tableBody) {
    return
  }

  _tableBody.innerHTML = ''

  for (let i = 0; i < data.length; i++) {
    const el = data[i]
    const unix = DateLib.toUnix(new Date(el.date))
    _tableBody.innerHTML += `
    <tr>
      <td class='transaction hash link'>
        ${el.transactionHash.substring(0, 26) + '...'}
      </td>
  
      <td class='chain id'>
        <div class='box'>
          <i data-tooltip='${getChainDetails(parseInt(el.chainId)).name}' data-type='${el.chainId}'></i>
        </div>
      </td>
  
      <td class='date'>
        <span data-tooltip='${DateLib.fromUnix(unix).toString()}'>
          ${DateLib.relativeTime(unix)}
        </span>
      </td>
  
      <td class='event name'>
        <div class='badge gray'>${el.eventName}</div>  
      </td>
  
      <td class='transaction sender link'>
        <div class='box'>
          <span data-tooltip='${el.transactionSender}'>${abbreviateAddress(el.transactionSender)}</span>
          <button data-text='${el.transactionSender}' data-state='idle' data-type='copy'>
            <i></i>
          </button>
        </div>
      </td>
  
      <td  class='contract link'>
        <div class='box'>
          <span data-flow='left' data-tooltip='${el.contract}'>${abbreviateAddress(el.contract)}</span>
          <button data-text='${el.contract}' data-state='idle' data-type='copy'>
            <i></i>
          </button>
        </div>
      </td>
  
      <td class='block number link'>
        ${el.blockNumber}
      </td>
      </tr>
    `
  }
}

const setTableLoading = () => {
  if (!_tableBody) {
    return
  }

  _tableBody.classList.add('shimmer')
}

const removeTableLoading = () => {
  if (!_tableBody) {
    return
  }

  _tableBody.classList.remove('shimmer')
}

export { buildTableBody, setTableLoading, removeTableLoading }
