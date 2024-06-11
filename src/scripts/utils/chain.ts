const getChainDetails = (chainId: number) => {
  const chains = [{
    id: 195,
    name: 'X Layer Testnet'
  },
  {
    id: 196,
    name: 'X Layer Mainnet'
  }]
  const defaultValue = { id: chainId, name: '' }
  return chains.find(el => el.id === chainId) || defaultValue
}

export { getChainDetails }
