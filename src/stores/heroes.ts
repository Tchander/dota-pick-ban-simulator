import { defineStore } from 'pinia';
import { IHeroesState } from '@/types';
import { HEROES } from '@/constants/heroes';

export const useHeroesStore = defineStore('heroes', {
  state: (): IHeroesState => ({
    heroes: [],
  }),

  getters: {},

  actions: {
    // Пока что хардкор. В будущем реализовать логику запроса данных героев раз в месяц
    getHeroes() {
      this.heroes = HEROES;
    },
  },
});
