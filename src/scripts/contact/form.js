import { post } from "./post";

const formElement = document.querySelector(".contact.us.form form");
const messageElement = formElement?.querySelector("p.message");

function getFormValues(form) {
  if (!messageElement) return;

  messageElement.textContent = "";

  const tocCheckbox = form.elements.termsOfConditions;
  if (!tocCheckbox.checked) {
    messageElement.dataset.type = "error";
    messageElement.textContent =
      "Please accept the terms and conditions to continue!";
    return tocCheckbox.focus();
  }

  const captcha = window.grecaptcha.getResponse();
  if (!captcha) {
    messageElement.dataset.type = "error";
    messageElement.textContent = "Please verify the captcha!";
    return;
  }

  const formFields = ["name", "email", "message"];

  const values = {};
  formFields.map((fieldName) => {
    const element = form.elements[fieldName];
    values[fieldName] = element.value;
  });

  values.captcha = captcha;

  submitForm(values, form);
}

async function submitForm(payload, formElement) {
  const { message, error, success } = await post(payload);

  if (error) messageElement.dataset.type = "error";
  if (success) {
    messageElement.dataset.type = "success";

    // empty form fields
    formElement.reset();
  }

  messageElement.textContent = Array.isArray(message) ? message[0] : message;
}

function addSubmitListener() {
  if (!formElement) return;

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    getFormValues(formElement);
  });
}
addSubmitListener();
