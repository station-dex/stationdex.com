const getIconsFromPoolName = (name: string) => {
  const pools = name.split('/')

  const icons: Record<string, string> = {
    'USDT': 'usdt-token',
    'WOKB': 'okb-token',
    'WETH': 'eth-token',
  }

  return pools.map(pool => icons[pool])
}

export { getIconsFromPoolName };