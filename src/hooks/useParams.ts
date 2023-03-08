import { useRouter } from 'next/router';
import { useCallback } from 'react';
import queryString from 'query-string';

type FilterParams = {
  name: string;
  value: string | null;
}[];

export function useParams(initialParams: FilterParams) {
  const router = useRouter();
  const hasQuery = Object.keys(router.query).length;
  let currentParams = initialParams;

  if (hasQuery) {
    currentParams = initialParams.map((param) => {
      const value = router.query[param.name] as string | undefined;
      return value ? { ...param, value } : param;
    });
  }

  const computeURLparams = useCallback(
    (params: FilterParams) => {
      return (
        params
          // filter out values that already exist in initial params
          .filter(
            (p) =>
              p.value !==
              initialParams.find((i) => i.name === p.name)?.value
          )
          // add the new values
          .reduce((newParams, { name, value }) => {
            newParams[name] = value?.split(',');
            return newParams;
          }, {} as { [key: string]: string[] | undefined })
      );
    },
    [initialParams]
  );

  const clearParams = useCallback(
    () => router.push('', undefined, { shallow: true }),
    [router]
  );

  const setCurrentParams = useCallback(
    (params: FilterParams) => {
      const urlParams = computeURLparams(params);
      const qs = queryString.stringify(urlParams, {
        arrayFormat: 'comma',
      });
      router.push(`${qs ? `?${qs}` : ''}`, undefined, {
        shallow: true,
      });
    },
    [router, computeURLparams]
  );

  return { currentParams, setCurrentParams, clearParams };
}
