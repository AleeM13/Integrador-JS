const register = document.getElementById('register');
const login = document.getElementById('login');

const changeRegister = () => {
    register.classList.add('active');
    login.classList.remove('active');
    loginForm.classList.add('hidden');
    regForm.classList.remove('hidden');
}
const changeLogin = () => {
    login.classList.add('active');
    register.classList.remove('active');
    loginForm.classList.remove('hidden')
    regForm.classList.add('hidden');
}
register.addEventListener('click', changeRegister);
login.addEventListener('click', changeLogin);



const regForm = document.querySelector('.register');
const nameInput = document.getElementById('name');
const userInput = document.getElementById('user');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');
const phoneInput = document.getElementById('phone');

const loginForm = document.querySelector('.login');
const logUserInput = document.getElementById('log-user');
const logPassInput = document.getElementById('log-pass');

let user = JSON.parse(localStorage.getItem("user")) || [];

const saveLocalStorage = (userList) => {
  localStorage.setItem("user", JSON.stringify(userList));
};

const checkUsername = () => {
    let valid = false;
    const min = 3;
    const max = 15;
    const username = userInput.value.trim();
    
    if(isEmpty(username)){
      showError(userInput, "El nombre de usuario es obligatorio") 
    } else if(!isBetween(username.length, min, max)) {
      showError(userInput, `El nombre debe tener entre ${min} y ${max} caracteres`)
    } else {
      showSuccess(userInput); 
      valid = true;
    }
    return valid
}

const checkEmail = () => {
    let valid = false;
    const emailValue = emailInput.value.trim();
    if(isEmpty(emailValue)){
      showError(emailInput, 'El email es obligatorio');
    } else if(!isEmailValid(emailValue)){ 
      showError(emailInput, 'El email no es valido');
    } else {
      showSuccess(emailInput); 
      valid = true;
    }
    return valid
}

const checkPassword = () => {
    let valid = false;
    const password = passInput.value.trim();
    if(isEmpty(password)){
      showError(passInput, 'La contraseña es obligatoria')
    } else if(!isPassValid(password)){
      showError(passInput, 'La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula y un caracter especial')
    } else {
      showSuccess(passInput);
      valid = true;
    }
    return valid;
}

const checkPhone = () => {
    let valid = false;
    const phoneValue = phoneInput.value.trim();
    if(!isPhoneValid(phoneValue)) {
      showError(phoneInput, 'El telefono ingresado es invalido')
    } else {
      showSuccess(phoneInput);
      valid = true;
    }
    return valid
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

const isPassValid = (pass) => {
    const re =  /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return re.test(pass)
}

const isPhoneValid = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone)
}

const isEmpty = (value) => value === "";

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove("success")
    formField.classList.add("error")
    const error = formField.querySelector("small");
    error.textContent = message;
}

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error")
    formField.classList.add("success")
    const error = formField.querySelector("small");
    error.textContent = "";
}

regForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let isUsernameValid = checkUsername();
    let isEmailValid = checkEmail();
    let isPasswordValid = checkPassword();
    let isPhoneValid = checkPhone();
    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPhoneValid;
  
    if(isFormValid){
      changeLogin();
    }

    let data = {
      username: userInput.value.trim(),
      password: passInput.value.trim(),
    }
    saveLocalStorage(data);
});

const checkLogUsername = () => {
    let valid = false;
    const min = 3;
    const max = 15;
    const username = logUserInput.value.trim();
    
    if(isEmpty(username)){
      showError(logUserInput, "El nombre de usuario es obligatorio") 
    } else {
      showSuccess(logUserInput); 
      valid = true;
    }
    return valid
}

const checkLogPassword = () => {
    let valid = false;
    const password = logPassInput.value.trim();
    if(isEmpty(password)){
      showError(logPassInput, 'La contraseña es obligatoria')
    } else {
      showSuccess(logPassInput);
      valid = true;
    }
    return valid;
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isUserValid = logUserInput.value.trim() === user.username && logPassInput.value.trim() === user.password;
    let isLogUsernameValid = checkLogUsername();
    let isLogUPasswordValid = checkLogPassword();
    let isLogFormValid = isLogUsernameValid && isLogUPasswordValid && isUserValid;
    if(isLogFormValid){
        loginForm.submit();
        window.location = 'index.html';
    } else {
      showError(logPassInput, 'El nombre de usuario o la contraseña son incorrectos.')
    }
})

const debounce = (fn, delay = 1000) => {
    let timeoutId;
    return(...args) => {
      if(timeoutId) clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
};
  
regForm.addEventListener(
    "input",
    debounce((e) => {
      switch (e.target.id){
        case 'username':
          checkUsername();
          break;
        case 'email':
          checkEmail();
          break;
        case 'password':
          checkPassword();
          break;
        case 'phone':
          checkPhone();
          break;
      }
    })
)