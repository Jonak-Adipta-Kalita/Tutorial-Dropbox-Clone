import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAA6eT2vlKBO6VVkW2Akp2Vr9Hr4ezavmk",
  authDomain: "jak-dropbox-clone.firebaseapp.com",
  projectId: "jak-dropbox-clone",
  storageBucket: "jak-dropbox-clone.appspot.com",
  messagingSenderId: "954863879495",
  appId: "1:954863879495:web:27e42fba8f906b2accb862",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
