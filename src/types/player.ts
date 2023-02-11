import { IHero } from '@/types/heroes';

export interface IPlayer {
  id: number;
  pickedHeroes: (IHero | null)[];
  bannedHeroes: (IHero | null)[];
}

export interface IPlayerState {
  player1: IPlayer;
  player2: IPlayer;
}
