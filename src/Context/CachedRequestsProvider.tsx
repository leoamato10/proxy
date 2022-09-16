import React from 'react';
import { useCallback, useContext, useEffect, useState } from "react";
import { ApiRequestContext, IActions, marvelProxy } from './ProxyProvider';
import { ApiRequestContextState, ContextStateFetched, ContextStateInitialized, MarvelData } from "../Types/Types";
import { getAuthQueryStringParams, getPaginationQueryStringParams } from "./Helper";

type Props = {
    url: string;
    maxResultsPerPage: number;
    children: JSX.Element;
  };

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
  
  