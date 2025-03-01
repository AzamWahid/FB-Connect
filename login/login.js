import { userLogin, userSignUp } from "../firebase.js";

const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

const tbSignUpEmail = document.querySelector('#signupEmail');
const tbSignupUser = document.querySelector('#signupUser');
const tbSignupPass = document.querySelector('#signupPass');
const tbSignupCnfrnPass = document.querySelector('#signupCnfrnPass');
const BtnSignup = document.querySelector('#signupBtn');

const tbloginEmail = document.querySelector('#loginEmail');
const tbloginPass = document.querySelector('#loginPass');
const Btnlogin = document.querySelector('#loginBtn');

BtnSignup.addEventListener('click', (event) => {
  Signup();
  event.preventDefault();
});

function Signup() {
  const signupDetails = {
    email: tbSignUpEmail.value,
    user : tbSignupUser.value,
    pass: tbSignupPass.value
  }
  const userInfo = userSignUp(signupDetails);
  console.log(userInfo);
}


Btnlogin.addEventListener('click', (event) => {
  login();
  event.preventDefault();
});

function login() {
  const loginDetails = {
    email: tbloginEmail.value,
    pass: tbloginPass.value
  }
  const userInfo = userLogin(loginDetails)
  console.log(userInfo);
}

signupBtn.addEventListener('click', () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.addEventListener('click', () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.addEventListener('click', () => {
  signupBtn.click();
  return false;
});
