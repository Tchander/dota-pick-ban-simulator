export const DEFAULT_NUMBER_OF_PICKS = 5;
export const DEFAULT_NUMBER_OF_BANS = 7;
export const DEFAULT_NUMBER_OF_ROUNDS =
  (DEFAULT_NUMBER_OF_PICKS + DEFAULT_NUMBER_OF_BANS) * 2;
export const BAN_ROUNDS = [1, 2, 3, 4, 9, 10, 11, 12, 13, 14, 19, 20, 21, 22];
export const PICK_ROUNDS = [5, 6, 7, 8, 15, 16, 17, 18, 23, 24];
export const FIRST_PICK_BAN_ROUNDS = [1, 3, 9, 11, 13, 19, 21];
export const FIRST_PICK_PICK_ROUNDS = [5, 8, 16, 17, 23];
export const ROUND_COUNTER_MAPPER: { [key: number]: number } = {
  1: 0,
  2: 0,
  3: 1,
  4: 1,
  5: 0,
  6: 0,
  7: 1,
  8: 1,
  9: 2,
  10: 2,
  11: 3,
  12: 3,
  13: 4,
  14: 4,
  15: 2,
  16: 2,
  17: 3,
  18: 3,
  19: 5,
  20: 5,
  21: 6,
  22: 6,
  23: 4,
  24: 4,
};
