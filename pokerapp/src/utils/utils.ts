import bcrypt from 'bcrypt';

const cardDealSound = new Audio(
  require('../assets/sounds/Card-flip-sound-effect.mp3'),
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

export async function generateId(
  newMoney: number,
  newWins: number,
  newLoses: number,
) {
  const id: string = await bcrypt.hash(
    newMoney.toString() +
      newWins.toString() +
      newLoses.toString() +
      process.env.apikey,
    10,
  );
  return id;
}
