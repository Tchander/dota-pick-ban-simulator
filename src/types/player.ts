import { IHero } from '@/types/heroes';

export interface IPlayer {
  id: number;
  name: string;
  pickedHeroes: (IHero | null)[];
  bannedHeroes: (IHero | null)[];
}

export interface IPlayerState {
  radiantPlayer: IPlayer;
  direPlayer: IPlayer;
}
