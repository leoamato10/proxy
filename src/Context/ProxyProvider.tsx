import { ApisauceInstance, create } from 'apisauce';
import { createContext } from 'react';
import { ApiRequestContextState, ContextStateUninitialized, MarvelData, MarvelResponse } from '../Types/Types';



export interface IActions {
  paginate(): void;
}

type ProxyHandler<T, P extends string> = {
  get?(target: T, p: P, receiver: any): any;
  set?(
    target: { results: { [key in P]?: T } },
    p: P,
    value: any,
    receiver: any,
  ): boolean;
};


const initialState = {
  isFetching: false,
};

export const ApiRequestContext = createContext<
  [ApiRequestContextState<MarvelData>, IActions]
>([initialState as ContextStateUninitialized, { paginate: () => undefined }]);



declare const Proxy: {
  new <T extends object>(
    target: { results: { [key in string]?: T }; apiInstance: ApisauceInstance },
    handler: ProxyHandler<T, string>,
  ): { [key: string]: Promise<T> };
};

export const marvelProxy = new Proxy<MarvelResponse>(
  { apiInstance: create({ baseURL: 'https://gateway.marvel.com' }), results: {} },
  {
    get: function <T extends MarvelResponse>(target: { results: { [key in string]?: T } }, url: string) {
      const values = target;

      return new Promise<T>(async (resolve, reject) => {
        if (values.results.hasOwnProperty(url)) {
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

