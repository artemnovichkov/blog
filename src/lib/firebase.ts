import admin from "firebase-admin"

// Only initialize Firebase if credentials are available
if (!admin.apps.length && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: "blog-ad799",
    }),
    databaseURL: "https://blog-ad799-default-rtdb.firebaseio.com/",
  })
}

// Export database or null if not initialized
export default admin.apps.length > 0 ? admin.database() : null as any
