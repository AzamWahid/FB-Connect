import { getPosts, loginStateObserver, logout, savePostinFirebase } from "./firebase.js";

const postCont = document.querySelector('.postCont')

var settingsMenu = document.querySelector(".setting_menu");
var darkBtn = document.getElementById("dark_btn");

var Btnlogout = document.querySelector("#logoutBtn");
var Btnsetting = document.querySelector("#settingBtn");

let btnGet = document.querySelector('#button_value');
let inputGet = document.querySelector('#input_vlaue');
let post = document.querySelector('#post');

btnGet.addEventListener('click', savePost);

let loggedInUserId;

function savePost() {
    const postData = {
        postText: inputGet.value,
        postPic: "",
        postUser: loggedInUserId
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
    darkBtn.addEventListener('click', () => {
        darkBtn.classList.toggle("dark_btn_on");
    })
    function passvalue() {
        var message = document.getElementById("")
    }



    // btnGet.addEventListener('click', () => {
    //     post.innerText = inputGet.value;
    // });
}

async function getAllPosts() {
    const Allposts = await getPosts();
    console.log(Allposts);
    const postsArray = Allposts.map((post) => {
    console.log(5);
        return `<div class="post_container">
                <div class="post_row">
                    <div class="user_profile">
                        <img src="images/profile-pic.png" alt="Pro We Are Pro You Now">
                        <div>
                            <p>${post.user}</p>
                            <span>Sep 9 2022 , 12:50 Am</span>
                        </div>
                    </div>
                    <a href=""><i class="fa fa-ellipsis-v"></i></a>
                </div>
                <p class="post_text">${post.postText}
                </p>
                <img src="images/feed-image-1.png" alt="Feedback" class="post_img">
                <div class="post_row">
                    <div class="activity_icon">
                        <div><img src="images/like-blue.png" alt="Like Kardo">120</div>
                        <div><img src="images/comments.png" alt="Like Kardo">65</div>
                        <div><img src="images/share.png" alt="Like Kardo">130</div>
                    </div>
                    <div class="post_profile_icon">
                        <img src="images/profile-pic.png" alt="Profile Pic"> <i class="fa fa-caret-down"></i>
                    </div>
                </div>
                </div>`
})
    console.log(postsArray);
    postCont.innerHTML = postsArray.join('');

}

starter();
getAllPosts();
Btnlogout.addEventListener('click', () => {
    logout();
});


