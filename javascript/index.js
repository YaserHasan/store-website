// DOM
document.querySelector('#nav-placeholder').replaceWith(UI.buildAuthNavBar());
const form = document.querySelector('#auth-form');
const emailInput = document.querySelector('#auth-email-input');
const passwordInput = document.querySelector('#auth-pass-input');
const alertMessage = document.querySelector('.alert-message');


// functions
function register() {
    const email = emailInput.value;
    const password = passwordInput.value;
    const response = AuthService.register(email, password);
    if (response[0])
        showSuccessAlert(response[1]);
    else
        showErrorAlert(response[1]);
}

function login() {
    const email = emailInput.value;
    const password = passwordInput.value;
    const response = AuthService.login(email, password);
    console.log(response);
    if (response instanceof User)
        window.location.replace(`./pages/store.html?id=${response.id}`);
    else
        showErrorAlert(response);
}

function showSuccessAlert(message) {
    alertMessage.style.display = 'block';
    alertMessage.textContent = message;
    alertMessage.classList.add('success');
}

function showErrorAlert(message) {
    alertMessage.style.display = 'block';
    alertMessage.textContent = message;
    alertMessage.classList.add('error');
}

function hideAlert() {
    alertMessage.textContent = '';
    alertMessage.classList.remove('success');
    alertMessage.classList.remove('error');
    alertMessage.style.display = 'none';
}


// event listeners
form.addEventListener('submit', e => {
    e.preventDefault();
    hideAlert();
    
    switch(e.submitter.id) {
        case 'register-btn':
            register();
            break;
        case 'sign-in-btn':
            login();
            break;
    }
});
