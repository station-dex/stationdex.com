import { post } from './post'

const formElement = document.querySelector('.contact.us.form form')
const messageElement = formElement?.querySelector('p.message')

const button = formElement?.querySelector('button[type=submit]')

const submitForm = async (payload, formElement) => {
  button.disabled = true
  const { message, error, success } = await post(payload)
  button.disabled = false

  let _message = message

  if (error) {
    messageElement.dataset.type = 'error'
    _message = message || 'Sorry, unexpected error occurred!'
  }

  if (success) {
    messageElement.dataset.type = 'success'
    _message = message || 'Successfully submitted form!'

    // empty form fields
    formElement.reset()
  }

  messageElement.textContent = _message
}

const getFormValues = (form) => {
  if (!messageElement) {
    return
  }

  messageElement.textContent = ''

  const tocCheckbox = form.elements.termsOfConditions

  if (!tocCheckbox.checked) {
    messageElement.dataset.type = 'error'
    messageElement.textContent =
      'Please accept the terms and conditions to continue!'
    return tocCheckbox.focus()
  }

  const captcha = window.grecaptcha.getResponse()

  if (!captcha) {
    messageElement.dataset.type = 'error'
    messageElement.textContent = 'Please verify the captcha!'
    return
  }

  const formFields = ['name', 'email', 'message']

  const values = {}
  formFields.forEach((fieldName) => {
    const element = form.elements[fieldName]
    values[fieldName] = element.value
  })

  values.captcha = captcha

  submitForm(values, form)
}

const addSubmitListener = () => {
  if (!formElement) {
    return
  }

  formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    getFormValues(formElement)
  })
}

addSubmitListener()
