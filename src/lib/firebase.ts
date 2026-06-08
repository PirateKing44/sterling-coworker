import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let _db: Firestore | null = null;

function getDb(): Firestore {
  if (_db) return _db;

  if (getApps().length === 0) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountJson) {
      const serviceAccount = JSON.parse(serviceAccountJson) as ServiceAccount;
      initializeApp({ credential: cert(serviceAccount) });
    } else {
      initializeApp();
    }
  }

  _db = getFirestore();
  return _db;
}

export const db = new Proxy({} as Firestore, {
  get(_target, prop) {
    return Reflect.get(getDb(), prop);
  },
});
