import * as functions from 'firebase-functions';

export const createUser = functions.https.onRequest((request, response) => {
    const { username, password }: any = request.body;



    response.status(200).send({msg: `New user - ${username} created!`});
});
