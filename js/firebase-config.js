import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCulDa1c-f_vKIPgHSSr6Deht9ORHCgWx4",
  authDomain: "tiffmon-88345.firebaseapp.com",
  projectId: "tiffmon-88345",
  storageBucket: "tiffmon-88345.firebasestorage.app",
  messagingSenderId: "679818483001",
  appId: "1:679818483001:web:42052a59bb31a3506004e8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db };

export { auth, provider };

provider.addScope("email");
provider.setCustomParameters({
  prompt: "select_account",
});