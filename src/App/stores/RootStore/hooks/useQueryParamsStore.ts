import { useSearchParams } from 'react-router-dom';
import { rootStore } from '../instance';

export const useQueryParamsStore = (): void => {
  const [params, setParams] = useSearchParams();

  rootStore.queryParamsStore.setSearchParamsSetter(setParams);
  rootStore.queryParamsStore.setParams(params);
};
