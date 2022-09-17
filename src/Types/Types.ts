import { ApisauceInstance } from "apisauce";

type MarvelHeroesListResponse = {
  comics:      Comics;
    description: string;
    events:      Comics;
    id:          number;
    modified:    string;
    name:        string;
    resourceURI: string;
    series:      Comics;
    stories?:     any;
    thumbnail:   Thumbnail;
    urls:        URL[];
};

 interface Comics {
  available:     number;
  collectionURI: string;
  items:         ComicsItem[];
  returned:      number;
}
 
 interface ComicsItem {
  name:        string;
  resourceURI: string;
 }

  interface Thumbnail {
  extension: Extension;
  path:      string;
 }
 
  enum Extension {
  GIF = "gif",
  Jpg = "jpg",
 }

type MarvelHeroComicsListResponse = {
  //TODO: tipar las respuestas de API para listado de cómics de un héroe
};

export type MarvelResponse = MarvelHeroesListResponse | MarvelHeroComicsListResponse;

type MarvelHeroData = Array<{}>; //TODO tipar los datos de héroes
type MarvelComicData = Array<{}>; //TODO: tipar los datos de cómics
export type MarvelData = MarvelHeroData | MarvelComicData;

export type ContextStateUninitialized = {
  url?: undefined;
  isFetching: false;
  data?: undefined;
};

export type ContextStateInitialized = {
  url: string;
  isFetching: false;
  data?: undefined;
};

type ContextStateFetching<T> = {
  url: string;
  isFetching: true;
  data?: T;
};

export type ContextStateFetched<T> = {
  url: string;
  isFetching: false;
  data: T;
  apisauceInstance: ApisauceInstance;
};

export type ApiRequestContextState<T> =
  | ContextStateUninitialized
  | ContextStateInitialized
  | ContextStateFetching<T>
  | ContextStateFetched<T>;