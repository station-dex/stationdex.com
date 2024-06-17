const abbreviateAddress = (str: string) => {
  return str.substring(0, 6) + '...' + str.substring(str.length - 6)
}

const formatNumber = (val: string | number) => {
  if (typeof val === 'string') {
    val = parseFloat(val)
  }

  return val.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

const etherAddressBasicValidate = (value: string) => {
  if (typeof value !== 'string') {
    return false
  }

  if (!value) {
    return true
  }

  if (!value.startsWith('0x')) {
    return false
  }

  if (value.length < 5) {
    return false
  }

  return true
}

export { abbreviateAddress, etherAddressBasicValidate, formatNumber }
