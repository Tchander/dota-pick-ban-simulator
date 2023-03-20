import { defineStore } from 'pinia';
import { StoreId } from '@/enum/stores';
import { ITimerState } from '@/types';
import { MAIN_TIME_DEFAULT, RESERVE_TIME_DEFAULT } from '@/constants/numbers';
import { TimerMapper } from '@/enum/timer';

export const useTimerStore = defineStore(StoreId.TIMER, {
  state: (): ITimerState => ({
    radiantMainTime: MAIN_TIME_DEFAULT,
    direMainTime: MAIN_TIME_DEFAULT,
    radiantReserveTime: RESERVE_TIME_DEFAULT,
    direReserveTime: RESERVE_TIME_DEFAULT,
    radiantTimerInterval: undefined,
    direTimerInterval: undefined,
  }),

  actions: {
    setTimeByDefault(timer: TimerMapper) {
      switch (timer) {
        case TimerMapper.RADIANT_MAIN_TIME:
          this.radiantMainTime = MAIN_TIME_DEFAULT;
          break;
        case TimerMapper.DIRE_MAIN_TIME:
          this.direMainTime = MAIN_TIME_DEFAULT;
          break;
        case TimerMapper.RADIANT_RESERVE_TIME:
          this.radiantReserveTime = RESERVE_TIME_DEFAULT;
          break;
        case TimerMapper.DIRE_RESERVE_TIME:
          this.direReserveTime = RESERVE_TIME_DEFAULT;
          break;
        default:
          break;
      }
    },

    decreaseTimer(timer: TimerMapper) {
      switch (timer) {
        case TimerMapper.RADIANT_MAIN_TIME:
          this.radiantMainTime--;
          break;
        case TimerMapper.DIRE_MAIN_TIME:
          this.direMainTime--;
          break;
        case TimerMapper.RADIANT_RESERVE_TIME:
          this.radiantReserveTime--;
          break;
        case TimerMapper.DIRE_RESERVE_TIME:
          this.direReserveTime--;
          break;
        default:
          break;
      }
    },
  },
});
