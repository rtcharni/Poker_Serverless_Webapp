import * as functions from 'firebase-functions';
import { getStatisticsDataDB, updateStatisticsDataDB2 } from '../utils/firestore';
import { ToplistUser } from '../models/toplist';

export const onFirestoreWrite = functions.firestore.document('users/{username}').onWrite(async (change, context) => {
    try {
        // Get an object with the current document value.
        // If the document does not exist, it has been deleted.
        const userDoc = change.after.exists ? change.after.data() : null; // if deleted do something

        // read toplist document -> find right user and his records
        const statistics = await getStatisticsDataDB();

        const toplistUser: ToplistUser = {};
        let needsToUpdate = false;
        let newUserCreated = true;

        Object.entries((statistics).forEach(([username, userStatistics]) => {
            if (userDoc && userDoc.username === username) {
                newUserCreated = false;
                toplistUser[username] = {};
                Object.entries(userStatistics).forEach(([recordName, recordValue]) => {
                    if (userDoc.statistics[recordName] > recordValue) {
                        toplistUser[username][recordName] = userDoc.statistics[recordName];
                        needsToUpdate = true;
                    } else if (userDoc.statistics[recordName] <= recordValue) {
                        toplistUser[username][recordName] = recordValue
                    }
                })
            }
        }))
        // if new document has better records then update better records to fetched toplist document
        if (needsToUpdate) {
            const writeResult = await updateStatisticsDataDB2(toplistUser);
        } else if (newUserCreated) {
            const newToplistUser: ToplistUser = {}
            newToplistUser[userDoc.username] = {biggest_win: 0, wins: 0, money: 0};
            const writeResult = await updateStatisticsDataDB2(newToplistUser);
        }

        return;

    } catch (error) {
        // What to do if error?
    }

})

