import { IHero, NoHero } from '@/types/heroes';

export interface IPlayer {
  id: number;
  name: string;
  pickedHeroes: (IHero | NoHero)[];
  bannedHeroes: (IHero | NoHero)[];
}

export interface IPlayerState {
  radiantPlayer: IPlayer;
  direPlayer: IPlayer;
}
