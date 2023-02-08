import { HeroesRoles } from '@/enum/heroes';

export interface IHeroes {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: HeroesRoles[];
  legs: number;
}

export interface IHeroesState {
  heroes: IHeroes[];
}
