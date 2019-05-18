export interface ToplistUser {
    [key: string]: UserStats
}

export interface UserStats {
    biggest_win: number;
    money: number;
    wins: number;
}
