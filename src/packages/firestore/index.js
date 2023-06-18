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
  startAfter,
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
  batch.set(docADocRef, record)
}

const commitBatch = (batch) => {
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

/**
 * @info https://firebase.google.com/docs/firestore/query-data/query-cursors
 */
const getCollectionList = async (order, page, pageSize) => {
  let q = null

  console.log(order)

  switch (true) {
    case page === 0 && order:
      q = query(firestoreCollection, orderBy('category', order), limit(pageSize || 10))
      break
    case order:
      q = query(firestoreCollection, orderBy('category', order), startAfter(await getPageAtIndex(page, pageSize)), limit(pageSize || 10))
      break
    case !order:
      q = query(firestoreCollection, orderBy('category'), startAfter(await getPageAtIndex(page, pageSize)), limit(pageSize || 10))
      break
    default:
      q = query(firestoreCollection, limit(pageSize || 10))
      break
  }

  return getDocs(q)
}

// Horrible implementation, we have to jump between objects to get the pagination
const getPageAtIndex = async (page, pageSize) => {
  // Query the first page of docs
  let first = null
  let documentSnapshots = null
  let lastVisible = null

  for (let i = 0; i < page; i++) {
    if (lastVisible) {
      first = query(firestoreCollection, orderBy('category'), startAfter(lastVisible), limit(pageSize))
    } else {
      first = query(firestoreCollection, orderBy('category'), limit(pageSize))
    }

    documentSnapshots = await getDocs(first)

    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
  }

  return lastVisible
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
