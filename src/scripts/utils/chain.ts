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
  return chains.find(el => el.id === chainId) || defaultValue
}

export { getChainDetails }
