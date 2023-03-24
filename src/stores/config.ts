import { defineStore } from 'pinia';
import { StoreId } from '@/enum/stores';
import { IConfigState } from '@/types';

export const useConfigStore = defineStore(StoreId.CONFIG, {
  state: (): IConfigState => ({
    isRadiantFirstPick: false,
    isTimer: false,
  }),

  actions: {
    setTimer(isTimer: boolean) {
      this.isTimer = isTimer;
    },

    setIsRadiantFirstPick(isRadiantFirstPick: boolean) {
      this.isRadiantFirstPick = isRadiantFirstPick;
    },
  },
});
