import { Player } from '@/gameplay/Player';

export function getUser(username: string, password: string) {
    return fetch('https://us-central1-poker-e0a17.cloudfunctions.net/getUser', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        // redirect: 'follow',
        body: JSON.stringify({username, password})
    }).then((response) => response.json());
}

export async function createUser(username: string, password: string) {
    return fetch('https://us-central1-poker-e0a17.cloudfunctions.net/createUser', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        // redirect: 'follow',
        body: JSON.stringify({username, password})
    }).then((response) => response.json());
}

export async function updateUser(player: Player) {
    const updateObj = {username: player.username, money: player.money, ...player.statistics };
    return fetch('https://us-central1-poker-e0a17.cloudfunctions.net/updateUser', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        // redirect: 'follow',
        body: JSON.stringify(updateObj)
    }).then((response) => response.json());
}

export async function getToplist() {
    return fetch('https://us-central1-poker-e0a17.cloudfunctions.net/getToplist', {
        method: 'GET',
        mode: 'cors',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        // redirect: 'follow',
        // body: JSON.stringify(updateObj)
    }).then((response) => response.json());
}
