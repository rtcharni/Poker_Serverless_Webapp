import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
export * from './onRequest-trigger/getUser';
export * from './onRequest-trigger/createUser';
export * from './onRequest-trigger/updateUser';

// admin.initializeApp();
admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

