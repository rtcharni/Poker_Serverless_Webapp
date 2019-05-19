export interface User {
    username: string;
    password: string;
    money: number;
    statistics: UserStatistics;
}

export interface UserStatistics {
    biggest_win?: number;
    draws?: number;
    loses?: number;
    money_record?: number;
    total_games?: number;
    wins?: number;
}