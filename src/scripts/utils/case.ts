const camelToDashCase = (inputStr: string) => {
  let outputStr = ''

  for (let i = 0; i < inputStr.length; i++) {
    const char = inputStr[i]

    if (char.toUpperCase() === char && /[a-zA-Z]/.test(char)) {
      outputStr += `-${char.toLowerCase()}`
    } else {
      outputStr += char
    }
  }

  return outputStr.replace(/^-/, '')
}

export { camelToDashCase }
