import admin from 'firebase-admin'

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        projectId: 'blog-ad799'
      }),
      databaseURL: 'https://blog-ad799-default-rtdb.firebaseio.com/'
    });
  }

export default admin.database()