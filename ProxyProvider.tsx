import {ApisauceInstance, create} from 'apisauce';
import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FlatList, Text, View } from 'react-native';


type MarvelHeroesListResponse = {
  //TODO: tipar las respuestas de API para listado de héroes
};

type MarvelHeroComicsListResponse = {
  //TODO: tipar las respuestas de API para listado de cómics de un héroe
};

type MarvelResponse = MarvelHeroesListResponse | MarvelHeroComicsListResponse;

type MarvelHeroData = Array<{}>; //TODO tipar los datos de héroes
type MarvelComicData = Array<{}>; //TODO: tipar los datos de cómics
type MarvelData = MarvelHeroData | MarvelComicData;

type ContextStateUninitialized = {
  url?: undefined;
  isFetching: false;
  data?: undefined;
};

type ContextStateInitialized = {
  url: string;
  isFetching: false;
  data?: undefined;
};

type ContextStateFetching<T> = {
  url: string;
  isFetching: true;
  data?: T;
};

type ContextStateFetched<T> = {
  url: string;
  isFetching: false;
  data: T;
  apisauceInstance: ApisauceInstance;
};

type ApiRequestContextState<T> =
  | ContextStateUninitialized
  | ContextStateInitialized
  | ContextStateFetching<T>
  | ContextStateFetched<T>;

interface IActions {
  paginate(): void;
}

const initialState = {
  isFetching: false,
};

type Props = {
  url: string;
  maxResultsPerPage: number;
  children: JSX.Element;
};

type ProxyHandler<T, P extends string> = {
  get?(target: T, p: P, receiver: any): any;
  set?(
    target: {results: {[key in P]?: T}},
    p: P,
    value: any,
    receiver: any,
  ): boolean;
};

declare const Proxy: {
  new <T extends object>(
    target: {results: {[key in string]?: T}; apiInstance: ApisauceInstance},
    handler: ProxyHandler<T, string>,
  ): {[key: string]: Promise<T>};
};

const marvelProxy = new Proxy<MarvelResponse>(
  {apiInstance: create({baseURL: 'https://gateway.marvel.com'}), results: {}},
  {
    get: function <T extends MarvelResponse>(target: { results: {[key in string]?: T }}, url: string) {
      const values = target;
      console.log('values', values);

      return new Promise<T>(async (resolve, reject) => {
        if (values.results.hasOwnProperty(url)) {
          console.log('primer if');
          resolve(values.results[url] as T);
          return;
        }

        try {
          const response = await (target as {
            results: {
              [key in string]?: T;
            };
            apiInstance: ApisauceInstance;
          }).apiInstance.get<T>(url);
          const { data } = response;
        
          
          // if (response.originalError?.response?.status !== 200 || !data) {
          //   throw new Error('Error fetching data');
          // }

          (target as {
            results: {
              [key in string]?: T;
            };
          }).results[url] = data;

          resolve(data);
          return 
        } catch (e) {
          reject(e);
        }
      });
    },
    set: (target, url: string, value) => {
      target.results[url] = value;
      return true;
    },
  },
);

const ApiRequestContext = createContext<
  [ApiRequestContextState<MarvelData>, IActions]
>([initialState as ContextStateUninitialized, {paginate: () => undefined}]);

function getAuthQueryStringParams(): {
  apikey: string;
  ts: string;
  hash: string;
} {
 return {
    apikey: "da3dce8fa885f5501a0fa544558226e4",
    ts: "leo",
    hash: "36f480b7ff3d3ee33e463bdf692b2716",
  }
}

function getPaginationQueryStringParams( maxResults: number,  page: number): {  limit: string;  offset: string;
} {
  return {
    limit: maxResults.toString(),
    offset: page.toString(),
  }
}

export function CachedRequestsProvider({
  children,
  url,
  maxResultsPerPage,
}: Props) {
  const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
    isFetching: false,
    url,
  } as ContextStateInitialized);

  const [page, setPage] = useState(0);

  const getNavigatableUrl = useCallback((): string => {
    const newUrl = new URL(url);

    Object.entries({
      ...getAuthQueryStringParams(),
      ...getPaginationQueryStringParams(maxResultsPerPage, page),
    }).forEach((param) => {
      newUrl.searchParams.append(param[0], param[1]);
    });

    const res = url + newUrl.toString().slice(22);

    return res;
  }, [page, state]);

  useEffect(() => {
    if (state.isFetching || !state.url) {
      return;
    }

    setState(
      state.url !== url
        ? {
            isFetching: true,
            url,
          }
        : {
            ...state,
            isFetching: true,
          },
    );

    marvelProxy[getNavigatableUrl()].then((value) => {
      setState({
        ...state,
        isFetching: false,
        data: {
          ...(state.data ?? {}),
          [url]: value,
        },
      } as ContextStateFetched<MarvelData>);
    });
  }, [page, url]);

  return (
    <ApiRequestContext.Provider
      value={[
        state,
        {
         paginate() {
         },
        },
      ]}>
      {children}
    </ApiRequestContext.Provider>
  );
}

export const useCachedRequests = (): [
  ApiRequestContextState<MarvelData>,
  IActions,
] => {
  return useContext(ApiRequestContext);
};

function HeroesList() {
  const [state, actions] = useCachedRequests();

  const results = state.data && state?.data["/v1/public/characters"].data.results

  return (
    <View>
      <FlatList
        data={results}
        renderItem={() => <Text>TODO</Text>}
        onEndReached={actions.paginate}
      />
    </View>
  );
}

export function ExampleProvidedComponent({url}: {url: string}) {
  return (
    <CachedRequestsProvider maxResultsPerPage={15} url={url}>
      <HeroesList />
    </CachedRequestsProvider>
  );
}
