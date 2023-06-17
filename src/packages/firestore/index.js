import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  getDoc,
  query,
  getDocs,
  getFirestore,
  writeBatch,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  startAt
} from 'firebase/firestore'

const COLLECTION_NAME = 'sentences'

// TODO move this to env (SECURITY ISSUE)
const firebaseConfig = {
  apiKey: 'AIzaSyBrRRr9sw9HsLRxJ3bN58IJEKvXPoH1V4w',
  authDomain: 'sentences-98acb.firebaseapp.com',
  projectId: 'sentences-98acb',
  storageBucket: 'sentences-98acb.appspot.com',
  messagingSenderId: '344774767867',
  appId: '1:344774767867:web:2fa528aeb4feab70f26c5e',
  measurementId: 'G-0KYVWGSJJ9'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const firestoreCollection = collection(db, COLLECTION_NAME)

const batch = writeBatch(db)
const docADocRef = doc(collection(db, COLLECTION_NAME))

const addBatchData = (record) => {
  console.log('setRecord')
  batch.set(docADocRef, record)
}

const writeBatchData = () => {
  console.log('COMMIT')
  return batch.commit()
}

const createNewSentence = (data) => {
  return addDoc(firestoreCollection, { data })
}

const getSentenceById = (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  return getDoc(docRef)
}

const deleteSentence = (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  return deleteDoc(docRef)
}

const updateSentence = (id, updatedData) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  return updateDoc(docRef, { data: { ...updatedData } })
}

const getSentenceList = (orderStr, offsetNum, limitNum) => {
  let order; let offset; let limit = null

  if (!orderStr) order = 'asc' // by default
  if (!offsetNum) offset = 0
  if (!limitNum) limit = 99999

  const q = query(firestoreCollection, orderBy('data.category', order), startAt(offset), limit(limit))

  return getDocs(q)
}

export {
  firestoreCollection,
  createNewSentence,
  getSentenceById,
  deleteSentence,
  updateSentence,
  addBatchData,
  writeBatchData,
  getSentenceList
}
