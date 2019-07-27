// get button element
const registerButton = document.querySelector('.register-button');
console.log(registerButton);

// add event listener
registerButton.addEventListener('click', () => {
  const usernameElement = document.querySelector('.username-input');
  const username = usernameElement.value;
  const errorMessageElement = document.querySelector(`.error-message`);
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  const repeatPassword = document.querySelector('.repeat-password-input').value;
  if (!username) {
    // show error message
    renderErrorMessage('username-error-message','Please input username');
  }else{
    errorMessageElement.innerText = ''
  }
  
  if(!email){
      renderErrorMessage('email-error-message','Please input email');
  }else{
    renderErrorMessage('email-error-message','');
  }

  if(!password){
      renderErrorMessage('password-error-message','Please input password');
  }else{
    renderErrorMessage('password-error-message','');
  }

  
  if(!repeatPassword){
      renderErrorMessage('repeat-error-message','Please repeat password');
  }else if(repeatPassword !== password){
    renderErrorMessage('repeat-error-message','Password not match, re-input!');
   
  }else{
    renderErrorMessage('repeat-error-message','');
    
  }


    if(username && email && password && repeatPassword===password){
      window.alert('ok');
    }
  

});


const renderErrorMessage = (elementId, errorMessage) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = errorMessage;
    }
};