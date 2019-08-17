import bcrypt from 'bcryptjs';
import { Player } from '@/gameplay/Player';

const cardDealSound = new Audio(
  require('../assets/sounds/Card-flip-sound-effect.mp3')
);
cardDealSound.volume = 0.5;
export { cardDealSound };

const winSound = new Audio(require('../assets/sounds/Sound-of-coin.mp3'));
winSound.volume = 0.5;
export { winSound };

export function soundsOff() {
  cardDealSound.volume = 0;
  winSound.volume = 0;
}

export function soundsOn() {
  cardDealSound.volume = 0.5;
  winSound.volume = 0.5;
}

export async function generateId(player: Player) {
  const id: string = await bcrypt.hash(
    combinePlayerProps(player) +
      process.env.VUE_APP_APIKEY,
    10,
  );
  return id;
}

export function combinePlayerProps(player: Player) {
  return `${player.username}${player.money}${player.statistics.wins}${
    player.statistics.loses
  }${player.statistics.draws}${player.statistics.biggest_win}${
    player.statistics.money_record
  }${player.statistics.total_games}`;
}
