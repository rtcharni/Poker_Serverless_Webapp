import { User, UserStatistics } from '../../../serverless/functions/src/models/user';

export class Player implements User {
    // Public vs Private.. to think about..
    public username?: string;
    public password?: string;
    public money?: number;
    public statistics?: UserStatistics;

    private bet: number = 0;

    constructor(username: string, money: number, statistics: UserStatistics) {
        this.username = username;
        this.money = money;
        this.statistics = statistics;
    }

    get currentBet() {
        return this.bet;
    }
    set currentBet(amount: number) {
        if (amount <= this.money) {
            this.currentBet = amount;
            this.money -= amount;
        } else {
            // No enought money TODO
        }
    }

    public payWinning(winMultiplier: number) {
        this.money += this.currentBet * winMultiplier;
        this.currentBet = 0;
    }

}

export function createMockPlayer() {
    const player: Player = new Player('Romppu', 100, { biggest_win: 50, wins: 30,
                                    loses: 28, draws: 2, money_record: 120, total_games: 60 });
    return player;
}
