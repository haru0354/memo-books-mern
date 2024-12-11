import admin from 'firebase-admin';
import path from 'path';

const directory = path.join(process.cwd());
const serviceAccount = path.resolve(directory, 'firebase-serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyToken = async (token) => {
  try {
    const verifiedToken = await admin.auth().verifyIdToken(token);
    return verifiedToken;
  } catch (err) {
    throw new Error(`無効なトークンです: ${err.message}`);
  }
};