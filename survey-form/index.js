const name = document.getElementById("name");
const submit = document.getElementById("submit")
const form = document.getElementById("survey-form")
const errMsg = document.getElementById("invalid-msg")


submit.addEventListener('click', e => {

  if(!form.checkValidity()) {
    errMsg.style.display = "block"
  }
  
});

