let form = document.querySelector('.login-form');
let registerButton = document.querySelector('.action .register-button');
let signInButton = document.querySelector('.action .sign-in-button');
let formHeading = document.querySelector('#form-heading');
let forgotPasswordLink = document.querySelector('.link.forgot-password');

registerButton.addEventListener('click', function() {
  form.classList.add('register-mode');
  formHeading.textContent = 'Sign up';
  forgotPasswordLink.style.display = 'none';
});

signInButton.addEventListener('click', function() {
  form.classList.remove('register-mode');
  formHeading.textContent = 'Login';
  forgotPasswordLink.style.display = 'block';
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  return false;
});
