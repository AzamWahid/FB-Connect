import { getPosts, loginStateObserver, logout, savePostinFirebase } from "./firebase.js";

const postCont = document.querySelector('.postCont')

var settingsMenu = document.querySelector(".setting_menu");
var darkBtn = document.getElementById("dark_btn");

var Btnlogout = document.querySelector("#logoutBtn");
var Btnsetting = document.querySelector("#settingBtn");

let btnGet = document.querySelector('#button_value');
let inputGet = document.querySelector('#input_vlaue');
let post = document.querySelector('#post');

const fileInput = document.querySelector('#fileInput');



btnGet.addEventListener('click', savePost);

let loggedInUserId;


async function savePost() {
    let postPicdata;
    const file = fileInput.files[0];
    if (!file) {
        alert('Please choose a file to upload');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fbconnect'); // Set your upload preset

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dl4in7cwc/image/upload`, {
            method: 'POST',
            body: formData,
        });

       postPicdata = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }

    const postData = {
        postText: inputGet.value,
        postPic: postPicdata.secure_url,
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
                            <p>${post.user.toUpperCase()}</p>
                            <span>Sep 9 2022 , 12:50 Am</span>
                        </div>
                    </div>
                    <a href=""><i class="fa fa-ellipsis-v"></i></a>
                </div>
                <p class="post_text">${post.postText}
                </p>
                ${post.postPic && `<img src=${post.postPic} alt="Feedback" class="post_img">`}
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


