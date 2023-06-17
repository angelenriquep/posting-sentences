import { initializeApp } from "firebase/app";
import { addDoc, collection, getDoc, query, where, getDocs, getFirestore, writeBatch, doc, deleteDoc, updateDoc, orderBy, limit, startAt } from "firebase/firestore";
// TODO move this to env
const firebaseConfig = {
  apiKey: "AIzaSyBrRRr9sw9HsLRxJ3bN58IJEKvXPoH1V4w",
  authDomain: "sentences-98acb.firebaseapp.com",
  projectId: "sentences-98acb",
  storageBucket: "sentences-98acb.appspot.com",
  messagingSenderId: "344774767867",
  appId: "1:344774767867:web:2fa528aeb4feab70f26c5e",
  measurementId: "G-0KYVWGSJJ9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firestoreCollection = collection(db, 'sentences');

const batch = writeBatch(db);
const docADocRef = doc(collection(db, "sentences"));

function addBatchData(record) {
  console.log('setRecord')
  batch.set(docADocRef, record);
}

function writeBatchData() {
  console.log('COMMIT')
  return batch.commit()
}

export { db, firestoreCollection, addBatchData, writeBatchData, addDoc, query, where, getDocs, collection, getFirestore, writeBatch, doc, getDoc, deleteDoc, updateDoc, orderBy, limit, startAt };