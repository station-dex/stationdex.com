const abbreviateAddress = (str: string) => {
  return str.substring(0, 6) + '...' + str.substring(str.length - 6)
}

const formatNumber = (val: string | number) => {
  if (typeof val === 'string') {
    val = parseFloat(val)
  }

  return val.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

const convertToGwei = (num: number) => {
  return formatNumber(num / Math.pow(10, 9))
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

const getTableBodyWhileLoading = () => {
  return Array(25).fill(0).map(() => `
  <tr>
    <td class='transaction hash shimmer'>
      0x1d2ab378974595cae26df161...
    </td>
    <td class='chain id shimmer'>
      <div class='box'>
        <i data-type='196'></i>
      </div>
    </td>
    <td class='date shimmer'>
      19 minutes ago
    </td>
    <td class='event name shimmer'>
      <div class='badge gray'>DecreaseLiquidity</div>  
    </td>
    <td class='transaction sender shimmer'>
      <div class='box'>
        <span>0x5006...0c38ee</span>
        <button data-text='0x5006...0c38ee' data-state='idle' data-type='copy'>
          <i></i>
        </button>
      </div>
    </td>
    <td  class='contract shimmer'>
      <div class='box'>
        <span>0x5006...0c38ee</span>
        <button data-text='0x5006...0c38ee' data-state='idle' data-type='copy'>
          <i></i>
        </button>
      </div>
    </td>
    <td class='block number shimmer'>
      2308080
    </td>
  </tr>
`).join(' ')
}

export { abbreviateAddress, etherAddressBasicValidate, formatNumber, getTableBodyWhileLoading, convertToGwei }
