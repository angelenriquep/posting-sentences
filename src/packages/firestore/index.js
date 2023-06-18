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
  startAt,
  limit
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

const createBatch = () => {
  return writeBatch(db)
}
const addBatchData = (batch, record) => {
  const docADocRef = doc(collection(db, COLLECTION_NAME))
  console.log('read')
  batch.set(docADocRef, record)
}

const commitBatch = (batch) => {
  console.log('commit')
  return batch.commit()
}

const createCollection = (data) => {
  return addDoc(firestoreCollection, { data })
}

const getCollectionById = (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  return getDoc(docRef)
}

const deleteCollection = (id) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  return deleteDoc(docRef)
}

const updateCollection = (id, updatedData) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  return updateDoc(docRef, { data: { ...updatedData } })
}

const getCollectionList = (orderStr, offsetNum, limitNum) => {
  const order = orderStr || 'asc'
  const offset = offsetNum || 0
  const lmt = limitNum || 9_999

  const q = query(firestoreCollection, orderBy('data.category', order), startAt(offset), limit(lmt))

  return getDocs(q)
}

export {
  firestoreCollection,
  createCollection,
  getCollectionById,
  deleteCollection,
  updateCollection,
  addBatchData,
  commitBatch,
  getCollectionList,
  createBatch
}
