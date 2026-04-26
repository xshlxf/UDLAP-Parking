import { db } from './firebase.js';
import {
  collection,
  doc,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';

function generateGrid(parkingId, rows, cols) {
  const spots = [];
  let count = 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const id = `${parkingId}-${String(count).padStart(3, '0')}`;

      spots.push({
        id,
        parkingId,
        status: 'free',
        x: Number((c / (cols - 1)).toFixed(4)),
        y: Number((r / (rows - 1)).toFixed(4)),
        createdAt: serverTimestamp()
      });

      count++;
    }
  }

  return spots;
}

function buildE2() {
  return generateGrid('E2', 12, 15);
}

function buildE5() {
  return generateGrid('E5', 10, 16);
}

export async function seedSpots() {
  if (!db) {
    console.error("Firestore no inicializado");
    return;
  }

  const batch = writeBatch(db);
  const spotsRef = collection(db, 'spots');

  const e2 = buildE2();
  const e5 = buildE5();

  [...e2, ...e5].forEach((spot) => {
    const ref = doc(spotsRef, spot.id);
    batch.set(ref, spot);
  });

  await batch.commit();

  console.log('Seeding completo:', e2.length + e5.length, 'spots');
}