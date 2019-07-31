import * as functions from 'firebase-functions';
import { getStatisticsDataDB, updateUserStatisticsDataDB } from '../utils/firestore';
import { Toplist } from '../models/toplist';

export const onFirestoreWrite = functions.firestore.document('users/{username}').onWrite(async (change, context) => {
    try {
        // If the document does not exist, it has been deleted.
        const userDoc = change.after.exists ? change.after.data() : null;
        if (!userDoc) return Promise.resolve();

        const statistics = await getStatisticsDataDB();
        const toplistUser: Toplist = {};
        let needsToUpdate = false;
        let newUserCreated = true;
        // Loop documents and compare statistics
        Object.entries(statistics).forEach(([username, userStatistics]) => {
            if (userDoc && userDoc.username === username) {
                newUserCreated = false;
                toplistUser[username] = {};
                Object.entries(userStatistics).forEach(([recordName, recordValue]) => {
                    if (recordName === 'money') {
                        if (userDoc['money'] !== recordValue) {
                            toplistUser[username]['money'] = userDoc['money']; 
                            needsToUpdate = true
                        } 
                    }

                    if (userDoc.statistics[recordName] > recordValue) {
                        toplistUser[username][recordName] = userDoc.statistics[recordName];
                        needsToUpdate = true;
                    } else if (userDoc.statistics[recordName] <= recordValue) {
                        toplistUser[username][recordName] = recordValue
                    }
                })
            }
        })
        // if new document has better records then update better records to fetched toplist document
        if (needsToUpdate) {
            await updateUserStatisticsDataDB(toplistUser);
        } else if (newUserCreated) {
            const newToplistUser: Toplist = {}
            newToplistUser[userDoc.username] = { biggest_win: 0, wins: 0, money: 50, money_record: 0 };
            await updateUserStatisticsDataDB(newToplistUser);
        }
        
        return;
    } catch (error) {
        console.error(error);
    }

})

