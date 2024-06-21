import { DateLib } from '@/util/date.js'
import { abbreviateAddress, getTableBodyWhileLoading } from './utils'
import { getAddressLink, getBlockNumberLink, getChainDetails } from '../utils/chain'
const _tableBody = document.querySelector('#explorer-table-body')

const buildTableBodyForError = (errorMessage: string) => {
  if (!_tableBody) {
    return
  }

  _tableBody.innerHTML = `
  <tr>
      <td class='error message' colspan='7'>
        <span>${errorMessage}</span>
      </td>
  </tr>
  `
}

const buildTableBody = (data: Anything[]) => {
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
        <a rel="noopener noreferrer" href="/explorer-details?id=${el.id}">
          ${el.transactionHash.substring(0, 26) + '...'}
        </a>
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
          <a href='${getAddressLink(el.chainId, el.transactionSender)}' target='_blank' data-tooltip='${el.transactionSender}'>${abbreviateAddress(el.transactionSender)}</a>
          <button data-text='${el.transactionSender}' data-state='idle' data-type='copy'>
            <i></i>
          </button>
        </div>
      </td>

      <td  class='contract link'>
        <div class='box'>
          <a href='${getAddressLink(el.chainId, el.contract)}' target='_blank' data-flow='left' data-tooltip='${el.contract}'>${abbreviateAddress(el.contract)}</a>
          <button data-text='${el.contract}' data-state='idle' data-type='copy'>
            <i></i>
          </button>
        </div>
      </td>

      <td class='block number link'>
        <a href='${getBlockNumberLink(el.chainId, el.blockNumber)}' target='_blank'>${el.blockNumber}</a>
      </td>
      </tr>
    `
  }
}

const setTableLoading = () => {
  if (!_tableBody) {
    return
  }

  _tableBody.innerHTML = getTableBodyWhileLoading()
}

export { buildTableBody, setTableLoading, buildTableBodyForError }
