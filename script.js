import { loginStateObserver, logout, savePostinFirebase } from "./firebase.js";

var settingsMenu = document.querySelector(".setting_menu");
var darkBtn = document.getElementById("dark_btn");

var Btnlogout = document.querySelector("#logoutBtn");
var Btnsetting = document.querySelector("#settingBtn");

let btnGet = document.querySelector('#button_value');
let inputGet = document.querySelector('#input_vlaue');
let post = document.querySelector('#post');

btnGet.addEventListener('click',savePost);

let loggedInUserId;

function savePost() {
    const postData = {
        postText : inputGet.value,
        postPic : "",
        postUser : loggedInUserId
    }
    savePostinFirebase(postData);
}

async function starter() {
    console.log("Salaam");
    const uid = await loginStateObserver();
    console.log(uid, "==>> uid");
   loggedInUserId = uid;

   Btnsetting.addEventListener('click', settingsMenuToggle)
    function settingsMenuToggle() {
        settingsMenu.classList.toggle("setting_menu_height");
    }
    darkBtn.addEventListener('click',()=>{
        darkBtn.classList.toggle("dark_btn_on");
    })
    function passvalue() {
        var message = document.getElementById("")
    }



    // btnGet.addEventListener('click', () => {
    //     post.innerText = inputGet.value;
    // });
}

starter();

Btnlogout.addEventListener('click', () => {
    logout();
});


