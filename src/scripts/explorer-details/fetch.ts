import { explorerDetailData, handleFetchError, renderData, setExplorerLoading } from './data'

const baseUrl = 'server' in window ? window.server : ''
const chainId = 'chainId' in window ? window.chainId : ''

const fetchTransactionDetails = async () => {
  try {
    setExplorerLoading(true)
    const { id } = explorerDetailData.get()
    const _data = await fetch(`${baseUrl}explorer/${chainId}/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })

    if (_data.status >= 300) {
      throw new Error('No data')
    }

    const _json = await _data.json()

    //   render data
    if (_json.data) {
      renderData(_json.data)
    }

    setExplorerLoading(false)
  } catch (e) {
    handleFetchError()
    console.error('Error fetching explorer detail response', e)
  }
}

export { fetchTransactionDetails }
