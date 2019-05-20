import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// admin.initializeApp();
admin.initializeApp(functions.config().firebase);

export * from './onRequest-trigger/getUser';
export * from './onRequest-trigger/createUser';
export * from './onRequest-trigger/updateUser';

