import admin from 'firebase-admin'

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        project_id: 'artemnovichkov-blog'
      }),
      databaseURL: 'https://blog-ad799-default-rtdb.firebaseio.com/'
    });
  }

export default admin.database()