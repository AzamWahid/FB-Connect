
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection,doc, setDoc,addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkIPTr9nCUBNG5CC3pDy1cC4SXoCIBE4c",
  authDomain: "fb-clone-azhi.firebaseapp.com",
  projectId: "fb-clone-azhi",
  storageBucket: "fb-clone-azhi.firebasestorage.app",
  messagingSenderId: "333648951584",
  appId: "1:333648951584:web:370dfa5ec68b040e637f45",
  measurementId: "G-W73K20S8JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


//------------SIGN UP------------------------------------------------------
export async function userSignUp(userSignupDetails) {
  try {
    const { email, pass } = userSignupDetails;

    const { pass: userPass, ...userDetailWithoutPass } = userSignupDetails;
    console.log(userDetailWithoutPass)
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass)
    const user = await userCredential.user;
    console.log(user);
    await setDoc(doc(db, "users", user.uid), {
      userDetailWithoutPass
    });

    alert("User Register Successfully!")
    setTimeout(() => {
      window.location.reload();
    }, 3000)
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  };
}

//-----------------LOGIN--------------------------------
export async function userLogin(userLoginDetails) {
  try {
    const { email, pass } = userLoginDetails;
    const userCredential = await signInWithEmailAndPassword(auth, email, pass)
    const user = await userCredential.user;

    console.log(user);
    alert("User login Successfully!")
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 2000)
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  };
}


//----------stateobserver----------------------
export function loginStateObserver() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid, "==>>>  login id")
        resolve(uid)
        // ...
      } else {
        // User is signed out
        // ...
        // alert("Please login first");
        setTimeout(() => {
          window.location.href = './login/index.html'
        }, 1000)
        reject("No User is logged In")
      }
    });
  })
}


//--------------------------------------SIGNOUT------------------------------
export async function logout() {
  try {
    await signOut(auth)
    setTimeout(() => {
      window.location.href = './login/index.html'
    }, 1000);
  }
  catch (error) {
    // An error happened.
  };
}




//------------------------SAVE POST--------------------------------
export async function savePostinFirebase(postData) {
  const docRef = await addDoc(collection(db, "posts"), {
    postData
  });
}