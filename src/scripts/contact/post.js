const post = async (payload, subscription = false) => {
  try {
    if (!window.server) {
      return { error: true, message: 'Sorry, unexpected error occured!' }
    }

    const body = JSON.stringify(payload, null, 2)

    const url = new URL(
      subscription ? '/subscribe' : '/contact',
      window.server
    )

    const response = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const msg = await response.json()

    if (response.status !== 200) {
      return { error: true, message: msg.message }
    }

    if (response.ok) {
      return { success: true, message: 'Successfully submitted form!' }
    }
  } catch (error) {}

  return { error: true, message: 'Unable to submit form!' }
}

export { post }
