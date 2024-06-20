const getChainDetails = (chainId: number) => {
  const chains = [{
    id: 195,
    name: 'X Layer Testnet',
    explorer: 'https://www.oklink.com/xlayer-test',
    explorerName: 'OkLink'
  },
  {
    id: 196,
    name: 'X Layer Mainnet',
    explorer: 'https://www.oklink.com/xlayer',
    explorerName: 'OkLink'
  }]
  const defaultValue = { id: chainId, name: '', explorer: '', explorerName: '' }
  return chains.find(el => el.id.toString() === chainId.toString()) || defaultValue
}

const getAddressLink = (chainId: number, address: string) => {
  const chainDetails = getChainDetails(chainId)
  return `${chainDetails.explorer}/address/${address}`
}

const getBlockNumberLink = (chainId: number, blockNumber: number) => {
  const chainDetails = getChainDetails(chainId)
  return `${chainDetails.explorer}/block/${blockNumber}`
}

const getTxHashLink = (chainId: number, txHash: string) => {
  const chainDetails = getChainDetails(chainId)
  return `${chainDetails.explorer}/tx/${txHash}`
}

export { getChainDetails, getAddressLink, getBlockNumberLink, getTxHashLink }
