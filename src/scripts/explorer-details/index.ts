import { handleCopyText } from '../utils/copy'
import { explorerDetailData, getDataFromUrl } from './data'
import { fetchTransactionDetails } from './fetch'

const explorerDetails = document.querySelector('#explorerDetail') as HTMLDivElement

explorerDetails.addEventListener('click', async (event) => {
  const _target = event.target as HTMLElement
  const nearestButton = _target.closest('button')

  if (!nearestButton) {
    return
  }

  const _buttonType = nearestButton.dataset.type

  switch (_buttonType) {
    case 'copy':
      handleCopyText(nearestButton)
      break
    default:
      console.log('no action to perform', nearestButton)
  }
});

(async () => {
  const { id } = getDataFromUrl()
  explorerDetailData.set('id', id)
  // do api call
  await fetchTransactionDetails()
})()
