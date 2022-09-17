import React, { createContext } from 'react';
import { useCallback, useContext, useEffect, useState } from "react";
import { IActions, marvelProxy } from './Proxy';
import { ApiRequestContextState, ContextStateFetched, ContextStateInitialized, ContextStateUninitialized, MarvelData } from "../Types/Types";
import { getAuthQueryStringParams, getPaginationQueryStringParams } from "./Helpers";


type Props = {
  url: string;
  maxResultsPerPage: number;
  children: JSX.Element;
};


const initialState = {
  isFetching: false,
};


const ApiRequestContext = createContext<
  [ApiRequestContextState<MarvelData>, IActions]
>([initialState as ContextStateUninitialized, { paginate: () => undefined }]);


export function HeroesProvider({
  children,
  url,
  maxResultsPerPage,
}: Props) {
  const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
    isFetching: false,
    url,
  } as ContextStateInitialized);

  const [page, setPage] = useState(0);


  const pagination = {
    paginate(goTo: string) {
      if (goTo === "nextPage") {
        setPage(prevPage => prevPage + maxResultsPerPage)
      } else {
        if (page === 0) return
        setPage(prevPage => prevPage - maxResultsPerPage)
      }
    },
  }


  const getNavigatableUrl = useCallback((): string => {
    const newUrl = new URL(url);

    Object.entries({
      ...getAuthQueryStringParams(),
      ...getPaginationQueryStringParams(maxResultsPerPage, page),
    }).forEach((param) => {
      newUrl.searchParams.append(param[0], param[1]);
    });

    const res = url + newUrl.toString().slice(22); // switch url protocol from http to https

    return res;
  }, [page, state]);


  useEffect(() => {
    if (state.isFetching || !state.url) return

    setState(
      state.url !== url
        ? { isFetching: true, page, url }
        : { ...state, page, isFetching: true },
    );

    marvelProxy[getNavigatableUrl()].then((value) => {
      setState({
        ...state, isFetching: false, data: { ...(state.data ?? {}), [url]: value }
      } as ContextStateFetched<MarvelData>);
    });
  }, [page, url]);


  return (
    <ApiRequestContext.Provider value={[state, pagination]}>
      {children}
    </ApiRequestContext.Provider>
  );
}


export const useCachedRequests = (): [ApiRequestContextState<MarvelData>, IActions] => {
  return useContext(ApiRequestContext);
};