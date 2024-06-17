import type { paths } from '@/elements/icons/paths'

const getIconsFromPoolName = (name: string) => {
  const pools = name.split('/')

  const icons: Record<string, keyof typeof paths> = {
    USDT: 'usdt-token',
    WOKB: 'okb-token',
    WETH: 'eth-token'
  }

  return pools.map(pool => icons[pool])
}

export { getIconsFromPoolName }
