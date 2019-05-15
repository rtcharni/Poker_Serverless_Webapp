import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
export * from './onRequest-trigger/testFunc';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

