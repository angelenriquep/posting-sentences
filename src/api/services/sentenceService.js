import { firestoreCollection, addDoc, getDoc, doc, collection, query, where, getDocs, db, deleteDoc, updateDoc, orderBy, limit, startAt } from '@pkg/firestore'
import logger from '@pkg/logger';

async function addSentence(req, res) {
  try {
    const sentence = await addDoc(firestoreCollection, { data: req.body });

    return res.send({ data: { id: sentence.id } });
  } catch (err) {
    logger.error(err)
    return res.sendStatus(500)
  }
};

async function getSentences(req, res) {
  try {
    // chear que solo dos valores!
    const { order, offset, lmt } = req.query;

    const q = query(firestoreCollection, orderBy("data.category", order), startAt(offset), limit(lmt));
    const querySnapshot = await getDocs(q);

    const sentenceList = querySnapshot.docs.map(doc => doc.data().data);

    return res.send(sentenceList);
  } catch (err) {
    console.log(err)
    logger.error(err)
    return res.sendStatus(500)
  }
}

async function getSentence(req, res) {
  try {
    const { id } = req.params;

    const docRef = doc(db, "sentences", id)
    const docSnap = await getDoc(docRef);

    if (!docSnap) {
      return res.send({ data: 'Sentence not found' });
    }

    return res.send(docSnap.data());
  } catch (err) {
    console.log(err)
    logger.error(err)
    return res.sendStatus(500)
  }
};

async function deleteSentence(req, res) {
  try {
    const { id } = req.params;

    const docRef = doc(db, "sentences", id)
    const docSnap = await deleteDoc(docRef);

    if (!docSnap) {
      return res.send({ data: 'Sentence not found' });
    }

    return res.send(docSnap.data());
  } catch (err) {
    console.log(err)
    logger.error(err)
    return res.sendStatus(500)
  }
};

async function updateSentence(req, res) {
  try {
    const { id } = req.params;

    const sentenceRef = doc(db, "sentences", id)

    console.log({ ...req.body })

    // Remove the 'capital' field from the document
    await updateDoc(sentenceRef, {
      data: { ...req.body }
    });

    return res.send();
  } catch (err) {
    console.log(err)
    logger.error(err)
    return res.sendStatus(500)
  }
};

export {
  addSentence,
  getSentence,
  getSentences,
  deleteSentence,
  updateSentence
}
