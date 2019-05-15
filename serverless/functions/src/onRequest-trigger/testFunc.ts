import * as functions from 'firebase-functions';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const testFunction = functions.https.onRequest((request, response) => {
    const query: string = request.query.id;
    response.send(`Hello from test function, query: ${query}`);
});
