import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { rootStore } from '../instance';

export const useQueryParamsStore = (): void => {
  const [params, setParams] = useSearchParams();

  React.useEffect(() => {
    rootStore.queryParamsStore.setParams(params);
  }, [params]);

  React.useEffect(() => {
    rootStore.queryParamsStore.setSearchParamsSetter(setParams);
  }, [setParams]);
};
