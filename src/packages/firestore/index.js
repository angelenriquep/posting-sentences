import * as firebase from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import 'dotenv/config'

const COLLECTION_NAME = 'sentences'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT
}

const app = initializeApp(firebaseConfig)
const db = firebase.getFirestore(app)
const firestoreCollection = firebase.collection(db, COLLECTION_NAME)

const createBatch = () => {
  return firebase.writeBatch(db)
}

const addBatchData = (batch, record) => {
  const docADocRef = firebase.doc(firebase.collection(db, COLLECTION_NAME))
  batch.set(docADocRef, record)
}

const commitBatch = (batch) => {
  return batch.commit()
}

const createCollection = (data) => {
  return firebase.addDoc(firestoreCollection, { data })
}

const getCollectionById = (id) => {
  const docRef = firebase.doc(db, COLLECTION_NAME, id)
  return firebase.getDoc(docRef)
}

const deleteCollection = (id) => {
  const docRef = firebase.doc(db, COLLECTION_NAME, id)
  return firebase.deleteDoc(docRef)
}

const updateCollection = (id, updatedData) => {
  const docRef = firebase.doc(db, COLLECTION_NAME, id)
  return firebase.updateDoc(docRef, { data: { ...updatedData } })
}

/**
 * @info https://firebase.google.com/docs/firestore/query-data/query-cursors
 */
const getCollectionList = async (order, page, pageSize) => {
  let q = null

  switch (true) {
    case page === 0 && order:
      q = firebase.query(firestoreCollection, firebase.orderBy('category', order), firebase.limit(pageSize || 10))
      break
    case order:
      q = firebase.query(
        firestoreCollection,
        firebase.orderBy('category', order),
        firebase.startAfter(await getPageAtIndex(page, pageSize)),
        firebase.limit(pageSize || 10)
      )
      break
    case !order:
      q = firebase.query(
        firestoreCollection,
        firebase.orderBy('category'),
        firebase.startAfter(await getPageAtIndex(page, pageSize)),
        firebase.limit(pageSize || 10)
      )
      break
    default:
      q = firebase.query(firestoreCollection, firebase.limit(pageSize || 10))
      break
  }

  return firebase.getDocs(q)
}

// Horrible implementation, we have to jump between objects to get the pagination
const getPageAtIndex = async (page, pageSize) => {
  // Query the first page of docs
  let first = null
  let documentSnapshots = null
  let lastVisible = null

  for (let i = 0; i < page; i++) {
    if (lastVisible) {
      first = firebase.query(
        firestoreCollection,
        firebase.orderBy('category'),
        firebase.startAfter(lastVisible),
        firebase.limit(pageSize)
      )
    } else {
      first = firebase.query(firestoreCollection, firebase.orderBy('category'), firebase.limit(pageSize))
    }

    documentSnapshots = await firebase.getDocs(first)

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
