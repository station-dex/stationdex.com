import { post } from '../contact/post'

const formElement = document.querySelector('.newsletter.component form')

const emailElement = formElement.querySelector('input[type="email"]')
const submitElement = formElement.querySelector('button[type="submit"]')

const messageElement = formElement.querySelector('p.message')

const handleSubmit = async (payload, formElement) => {
  submitElement.disabled = true
  const { message, error, success } = await post(payload, true)
  submitElement.disabled = false

  let _message = message

  if (error) {
    messageElement.dataset.type = 'error'
    _message = message || 'Sorry, unexpected error occured!'
  }

  if (success) {
    messageElement.dataset.type = 'success'
    _message = message || 'Successfully subscribed!'

    formElement.reset()
  }

  messageElement.textContent = _message
}

if (formElement) {
  formElement.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log({ emailElement, submitElement, messageElement })

    if (!emailElement || !submitElement || !messageElement) {
      return
    }

    const email = emailElement.value
    const payload = { email }

    handleSubmit(payload, formElement)
  })
}
