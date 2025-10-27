// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDEdVWdBesQMW_6p_iXtlpud2yhTXvAhK8",
  authDomain: "studio-5627132509-81823.firebaseapp.com",
  projectId: "chatbox-chats",
  storageBucket: "chatbox-chats.appspot.com",
  messagingSenderId: "10200860576",
  appId: "1:10200860576:android:262315d86f6d1732ddc6c5"
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
