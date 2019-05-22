import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// admin.initializeApp();
admin.initializeApp(functions.config().firebase);

export * from './onRequest/getUser';
export * from './onRequest/createUser';
export * from './onRequest/updateUser';
export * from './onRequest/getToplist';
export * from './onFirestoreChange/onFirestoreWrite';

