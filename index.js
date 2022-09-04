import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0H_2v2lpAWIZvP54txiriBmczF5kjukY",
  authDomain: "kec-contacts-fd311.firebaseapp.com",
  databaseURL: "https://kec-contacts-fd311-default-rtdb.firebaseio.com",
  projectId: "kec-contacts-fd311",
  storageBucket: "kec-contacts-fd311.appspot.com",
  messagingSenderId: "1035333586208",
  appId: "1:1035333586208:web:50c9cbba4d91d3a618db45",
  measurementId: "G-Q32LKHSBDC",
};

initializeApp(firebaseConfig);
const db = getFirestore();

const colref = collection(db, "myStaff");

function del(userdoc) {
  const docRef = doc(db, "myStaff", userdoc.id);
  deleteDoc(docRef);
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openFormadd() {
  document.getElementById("myForm1").style.display = "block";
}
function closeFormadd() {
  document.getElementById("myForm1").style.display = "none";
}
var closeedit = document.getElementById("closeedit");
closeedit.addEventListener("click", closeForm);

var closeadd = document.getElementById("closeadd");
closeadd.addEventListener("click", closeFormadd);

var addbut = document.getElementById("addbutton");
var boolean = false;
addbut.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("adddoc");
  openFormadd();
  const addBookForm = document.querySelector(".add");
  var imageadd = document.getElementById("imageadd");
  imageadd.addEventListener("change", (e) => {
    console.log("adding imge");
    const file = e.target.files[0];
    console.log(file);
    const metaData = {
      contentType: file.type,
    };
    const storage = getStorage();
    const storageRef = sRef(storage, "Images/" + file.name);
    const UploadTask = uploadBytesResumable(storageRef, file, metaData);
    console.log("uploaded");
    UploadTask.on(
      "state-changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("upprogress").innerHTML =
          "Upload: " + progress + "%";
      },
      (error) => {
        alert("Image not uploaded");
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
          addBookForm.addEventListener("submit", (e) => {
            e.preventDefault();
            addDoc(colref, {
              username: document.getElementById("usernameadd").value,
              email: document.getElementById("emailadd").value.split(","),
              phonenumber: document.getElementById("phonenumberadd").value,
              designation: document.getElementById("designationadd").value,
              dept: document.getElementById("departmentadd").value,
              category: document.getElementById("categoryadd").value,
              imgurl: downloadURL,
            }).then(() => {
              addBookForm.reset();
              window.location.reload();
            });
          });
          console.log(downloadURL);
        });
      }
    );
  });
});

var box = document.getElementById("box");

getDocs(colref).then((snapshot) => {
  snapshot.docs.forEach((userdoc) => {
    console.log(userdoc.data());
    var wrapper = document.createElement("div");
    wrapper.className = "card";
    var image = document.createElement("img");
    image.src = userdoc.data().imgurl;
    var container = document.createElement("div");
    container.className = "container";
    var username = document.createElement("p");
    username.innerText = userdoc.data().username;
    var emaillist = document.createElement("div");
    // emaillist.innerText = userdoc.data().email;
    userdoc.data().email.map((e) => {
      var email = document.createElement("p");
      email.innerText = e;
      console.log(e);
      emaillist.appendChild(email);
    });

    var phonenumber = document.createElement("p");
    phonenumber.innerText = userdoc.data().phonenumber;
    var designation = document.createElement("p");
    designation.innerText = userdoc.data().designation;
    var department = document.createElement("p");
    designation.innerText = userdoc.data().dept;
    var category = document.createElement("p");
    category.innerText = userdoc.data().category;
    wrapper.appendChild(image);
    container.appendChild(username);
    container.appendChild(emaillist);
    container.appendChild(phonenumber);
    container.appendChild(designation);
    container.appendChild(department);
    container.appendChild(category);

    wrapper.appendChild(container);
    var delet = document.createElement("button");
    delet.className = "delbut";
    delet.addEventListener("click", (e) => {
      e.preventDefault();
      const docRef = doc(db, "myStaff", userdoc.id);
      deleteDoc(docRef).then(() => {
        window.location.reload();
      });
    });
    delet.innerHTML = `<i class="fa-solid fa-trash icon"></i>`;
    var edi = document.createElement("button");
    edi.className = "editbut";
    edi.innerHTML = `<i class="fa-solid fa-pen-to-square icon"></i>`;
    edi.addEventListener("click", (e) => {
      e.preventDefault();
      // edi.addEventListener("click", openForm);
      openForm();
      // const updateForm = document.querySelector(".form-container");
      const editbut = document.getElementById("updatebut");
      // updateForm.addEventListener("submit", (e) => {
      editbut.addEventListener("click", (e) => {
        e.preventDefault();
        let docRef = doc(db, "myStaff", userdoc.id);
        var usernamenew = document.getElementById("usernamenew").value;
        var emailnew = document.getElementById("emailnew").value;
        var phonenumbernew = document.getElementById("phonenumbernew").value;
        var designationnew = document.getElementById("designationnew").value;
        var departmentnew = document.getElementById("departmentnew").value;
        var categorynew = document.getElementById("categorynew").value;
        updateDoc(docRef, {
          username: usernamenew,
          email: emailnew,
          phonenumber: phonenumbernew,
          designation: designationnew,
          dept: departmentnew,
          category: categorynew,
        }).then(() => {
          // updateForm.reset();
          // console.log("updated");
          window.location.reload();
        });
      });
      // });
    });
    var but = document.createElement("div");
    but.appendChild(edi);
    but.appendChild(delet);
    but.className = "buttons";
    wrapper.appendChild(but);
    box.appendChild(wrapper);
  });
});
