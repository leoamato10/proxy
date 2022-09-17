import { ApisauceInstance } from "apisauce";
import { Comic, Hero, MarvelHeroesListResponse } from "./ApiResponsetypes.ts";



type MarvelHeroComicsListResponse = {
  //TODO: tipar las respuestas de API para listado de cómics de un héroe
};

export type MarvelResponse = MarvelHeroesListResponse | MarvelHeroComicsListResponse;

type MarvelHeroData = Array<Hero>; 
type MarvelComicData = Array<Comic>;
export type MarvelData = MarvelHeroData | MarvelComicData;

export type ContextStateUninitialized = {
  url?: undefined;
  isFetching: false;
  page: number;
  data?: undefined;
};

export type ContextStateInitialized = {
  url: string;
  isFetching: false;
  page: number;
  data?: undefined;
};

type ContextStateFetching<T> = {
  url: string;
  isFetching: true;
  page: number;
  data?: T;
};

export type ContextStateFetched<T> = {
  url: string;
  isFetching: false;
  page: number;
  data: T;
  apisauceInstance: ApisauceInstance;
};

export type ApiRequestContextState<T> =
  | ContextStateUninitialized
  | ContextStateInitialized
  | ContextStateFetching<T>
  | ContextStateFetched<T>;