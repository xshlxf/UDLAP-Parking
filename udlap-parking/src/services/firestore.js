import { db } from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';

// Obtener estacionamientos
export async function getParkingLots() {
  const snapshot = await getDocs(collection(db, 'parking_lots'));
  return snapshot.docs.map(doc => doc.data());
}

// Obtener spots por estacionamiento
export async function getSpotsByParking(parkingId) {
  const snapshot = await getDocs(collection(db, 'spots'));
  return snapshot.docs
    .map(doc => doc.data())
    .filter(s => s.parkingId === parkingId);
}