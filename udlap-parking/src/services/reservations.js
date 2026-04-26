import { db, auth } from './firebase.js';
import {
  doc,
  runTransaction,
  serverTimestamp
} from 'firebase/firestore';

// Reserva segura: evita que dos usuarios tomen el mismo cajón
export async function reserveSpot(spotId, parkingId) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  const spotRef = doc(db, 'spots', spotId);
  const reservationRef = doc(db, 'reservations', `${spotId}_${user.uid}`);

  await runTransaction(db, async (transaction) => {
    const spotDoc = await transaction.get(spotRef);

    if (!spotDoc.exists()) {
      throw new Error('El cajón no existe');
    }

    const spotData = spotDoc.data();

    if (spotData.status !== 'free') {
      throw new Error('Cajón no disponible');
    }

    // 1. Marcar cajón como reservado
    transaction.update(spotRef, {
      status: 'reserved'
    });

    // 2. Crear reservación
    transaction.set(reservationRef, {
      userId: user.uid,
      spotId,
      parkingId,
      status: 'active',
      createdAt: serverTimestamp()
    });
  });
}