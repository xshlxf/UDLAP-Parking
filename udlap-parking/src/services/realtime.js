import { db } from './firebase.js';
import {
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

// Escucha todos los spots de un estacionamiento
export function subscribeToSpots(parkingId, callback) {
  const q = query(
    collection(db, 'spots'),
    where('parkingId', '==', parkingId)
  );

  return onSnapshot(q, (snapshot) => {
    const spots = snapshot.docs.map(doc => doc.data());
    callback(spots);
  });
}