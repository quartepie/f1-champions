import { Driver } from './driver';

export interface RaceChampion {
  round: string;
  raceName: string;
  driver: Driver & { isSeasonWinner: boolean }
}
