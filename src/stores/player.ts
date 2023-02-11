import { defineStore } from 'pinia';
import { IPlayer, IPlayerState } from '@/types/player';
import { StoreId } from '@/enum/stores';
import { IHero } from '@/types';

export const usePlayerStore = defineStore(StoreId.PLAYER, {
  state: (): IPlayerState => ({
    player1: {
      id: 1,
      pickedHeroes: [],
      bannedHeroes: [],
    },
    player2: {
      id: 2,
      pickedHeroes: [],
      bannedHeroes: [],
    },
  }),

  getters: {},

  actions: {
    pickHero(hero: IHero, player: IPlayer, currentPickNumber: number) {
      if (player.id === this.player1.id) {
        this.player1.pickedHeroes[currentPickNumber] = hero;
      }
      if (player.id === this.player2.id) {
        this.player2.pickedHeroes[currentPickNumber] = hero;
      }
    },

    banHero(hero: IHero, player: IPlayer, currentBanNumber: number) {
      if (player.id === this.player1.id) {
        this.player1.bannedHeroes[currentBanNumber] = hero;
      }
      if (player.id === this.player2.id) {
        this.player2.bannedHeroes[currentBanNumber] = hero;
      }
    },

    setNumberOfPickedHeroes(n: number = 5) {
      for (let i = 0; i < n; i++) {
        this.player1.pickedHeroes.push(null);
        this.player2.pickedHeroes.push(null);
      }
    },

    setNumberOfBannedHeroes(n: number = 7) {
      for (let i = 0; i < n; i++) {
        this.player1.bannedHeroes.push(null);
        this.player2.bannedHeroes.push(null);
      }
    },
  },
});
