import { Player } from '@/gameplay/Player';
import VueRouter from 'vue-router';
import { generateId } from './utils';

export async function getUser(username: string, password: string) {
    const response = await fetch('https://us-central1-poker-e0a17.cloudfunctions.net/getUser', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });
    const auth = response.headers.get('Authorization');
    const body = await response.json();
    return {auth, ...body};
}

export async function createUser(username: string, password: string) {
    const response = await fetch('https://us-central1-poker-e0a17.cloudfunctions.net/createUser', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });
    return await response.json();
}

export async function updateUser(player: Player, auth: string, router: VueRouter) {
    const id = await generateId(player);
    const updateObj = {username: player.username, money: player.money, ...player.statistics, id };
    const response = await fetch('https://us-central1-poker-e0a17.cloudfunctions.net/updateUser', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        redirect: 'manual',
        body: JSON.stringify(updateObj),
    });
    if (response.type === 'opaqueredirect') {
        router.replace({name: 'login',
            params: { user: null, loggedIn: 'false', msg: 'Please login again!' },
        });
        return {auth: null};
    }
    const newAuth = response.headers.get('Authorization');
    const body = await response.json();
    return {auth: newAuth, ...body};
}

export async function getToplist() {
    const response = await fetch('https://us-central1-poker-e0a17.cloudfunctions.net/getToplist', {
        method: 'GET',
        mode: 'cors',
    });
    return await response.json();
}
