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
  let _message = message;

  if (error) {
    messageElement.dataset.type = "error";
    _message = message || "Sorry, unexpected error occured!";
  }
  if (success) {
    messageElement.dataset.type = "success";
    _message = message || "Successfully submitted form!";

    // empty form fields
    formElement.reset();
  }

  messageElement.textContent = _message;
}

function addSubmitListener() {
  if (!formElement) return;

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    getFormValues(formElement);
  });
}
addSubmitListener();
