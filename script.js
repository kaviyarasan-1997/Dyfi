// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAn4ey1edpQ2cV9PBwadsrAkJFST9ztaXE",
  authDomain: "studio-5627132509-81823.firebaseapp.com",
  projectId: "studio-5627132509-81823",
  storageBucket: "studio-5627132509-81823.firebasestorage.app",
  messagingSenderId: "665180709342",
  appId: "1:665180709342:web:7cfb3270e69ce2bc3abd4f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postForm = document.getElementById("postForm");
const postContent = document.getElementById("postContent");
const postsContainer = document.getElementById("postsContainer");

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = postContent.value;
  if (content.trim()) {
    await addDoc(collection(db, "posts"), {
      content,
      timestamp: new Date()
    });
    postContent.value = "";
    loadPosts();
  }
});

async function loadPosts() {
  postsContainer.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    const post = document.createElement("div");
    post.className = "post";
    post.textContent = doc.data().content;
    postsContainer.appendChild(post);
  });
}

loadPosts();