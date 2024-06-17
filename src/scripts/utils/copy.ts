const handleCopyText = (targetButton: HTMLButtonElement) => {
  const text = targetButton.dataset.text

  if (!text) {
    return
  }

  const supportsClipboard = 'clipboard' in navigator

  if (!supportsClipboard) {
    console.error('Copy text is not supported in this browser')
    return
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      targetButton.dataset.state = 'copied'
      setTimeout(() => {
        targetButton.dataset.state = 'idle'
      }, 1500)
    })
    .catch(err => console.error('Error copying text', err))
}

export { handleCopyText }
