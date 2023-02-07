import { HeroesRoles, HeroesPrimaryAttribute } from '@/enum/heroes';

export interface IHeroes {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: HeroesPrimaryAttribute;
  attack_type: string;
  roles: HeroesRoles[];
  legs: number;
}

export interface IHeroesState {
  heroes: IHeroes[];
}
