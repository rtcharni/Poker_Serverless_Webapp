import * as functions from 'firebase-functions';
import { getStatisticsDataDB } from '../utils/firestore';

export const getToplist = functions.https.onRequest(async (request, response) => {
    try {
        const toplist = await getStatisticsDataDB();
        response.send({ toplist, success: true });
    } catch (error) {
        response.status(500).send({ msg: `Server error...`, success: false});
    }
});
