import { defineStore } from 'pinia';
import {IHero, IHeroesState, NoHero} from '@/types';
import { HEROES } from '@/constants/heroes';
import { StoreId } from '@/enum/stores';

export const useHeroesStore = defineStore(StoreId.HEROES, {
  state: (): IHeroesState => ({
    heroes: [],
  }),

  getters: {
    // pass
  },

  actions: {
    // Пока что хардкод. В будущем реализовать логику запроса данных героев раз в месяц
    getHeroes() {
      this.heroes = HEROES;
      this.heroes.forEach((hero: IHero) => {
        hero.isPicked = false;
        hero.isBanned = false;
      });
    },

    heroPicked(pickedHero: IHero | NoHero) {
      const index = this.heroes.findIndex((hero: IHero) => pickedHero === hero);
      if (index !== -1) {
        this.heroes[index].isPicked = true;
      }
    },

    heroBanned(pickedHero: IHero | NoHero) {
      const index = this.heroes.findIndex((hero: IHero) => pickedHero === hero);
      if (index !== -1) {
        this.heroes[index].isBanned = true;
      }
    },
  },
});
