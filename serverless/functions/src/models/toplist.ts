export interface Toplist {
    [key: string]: UserStats
}

export interface UserStats {
    biggest_win?: number;
    money?: number;
    wins?: number;
    money_record?: number;
}
