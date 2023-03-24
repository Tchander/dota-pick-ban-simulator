import { defineStore } from 'pinia';
import { StoreId } from '@/enum/stores';
import { IHero, IPlayer, IPlayerState, NoHero } from '@/types';
import { DEFAULT_NUMBER_OF_BANS, DEFAULT_NUMBER_OF_PICKS } from '@/constants/numbers';
import { NO_HERO } from '@/constants/heroes';

export const usePlayerStore = defineStore(StoreId.PLAYER, {
  state: (): IPlayerState => ({
    radiantPlayer: {
      id: 1,
      name: 'Radiant',
      pickedHeroes: [],
      bannedHeroes: [],
    },
    direPlayer: {
      id: 2,
      name: 'Dire',
      pickedHeroes: [],
      bannedHeroes: [],
    },
  }),

  actions: {
    pickHero(hero: IHero | NoHero, currentPickNumber: number, player?: IPlayer) {
      if (player!.id === this.radiantPlayer.id) {
        this.radiantPlayer.pickedHeroes[currentPickNumber] = hero;
      }
      if (player!.id === this.direPlayer.id) {
        this.direPlayer.pickedHeroes[currentPickNumber] = hero;
      }
    },

    banHero(hero: IHero | NoHero, currentBanNumber: number, player?: IPlayer) {
      if (player!.id === this.radiantPlayer.id) {
        this.radiantPlayer.bannedHeroes[currentBanNumber] = hero;
      }
      if (player!.id === this.direPlayer.id) {
        this.direPlayer.bannedHeroes[currentBanNumber] = hero;
      }
    },

    setNumberOfPickedHeroes(n: number = DEFAULT_NUMBER_OF_PICKS) {
      for (let i = 0; i < n; i++) {
        this.radiantPlayer.pickedHeroes.push(NO_HERO);
        this.direPlayer.pickedHeroes.push(NO_HERO);
      }
    },

    setNumberOfBannedHeroes(n: number = DEFAULT_NUMBER_OF_BANS) {
      for (let i = 0; i < n; i++) {
        this.radiantPlayer.bannedHeroes.push(NO_HERO);
        this.direPlayer.bannedHeroes.push(NO_HERO);
      }
    },
  },
});
