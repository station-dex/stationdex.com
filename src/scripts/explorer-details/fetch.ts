import { explorerDetailData, renderData } from './data'

const baseUrl = 'server' in window ? window.server : ''
const chainId = 'chainId' in window ? window.chainId : ''

const fetchTransactionDetails = async () => {
  try {
    // setLoading()
    const { id } = explorerDetailData.get()
    const _data = await fetch(`${baseUrl}/explorer/${chainId}/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
    const _json = await _data.json()

    //   render data
    if (_json.data) {
      renderData(_json.data)
    }

    console.log(_json)
    // removeLoading()
  } catch (e) {
    console.error('Error fetching explorer detail response', e)
  }
}

export { fetchTransactionDetails }