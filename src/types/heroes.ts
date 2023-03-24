import { HeroesRoles, HeroesPrimaryAttribute } from '@/enum/heroes';

export type NoHero = string;

export interface IHero {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: HeroesPrimaryAttribute;
  attack_type: string;
  roles: HeroesRoles[];
  legs: number;
  isPicked?: boolean;
  isBanned?: boolean;
}

export interface IHeroesState {
  heroes: IHero[];
}
