import { useParams } from '@/hooks/useParams';
import { useContext, createContext, useCallback } from 'react';

export type FilterParam = {
  name: string;
  value: string | null;
};

type FiltersContextProps = {
  activeFilters: { [key: string]: string[] | null } | null;
  updateFilter: (name: string, value: string) => void;
  clearFilters: () => void;
};

const Context = createContext<FiltersContextProps>({
  activeFilters: null,
  updateFilter: () => {},
  clearFilters: () => {},
});

export const FiltersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const filterGroups = [{ name: 'tags', value: null }];

  const { currentParams, setCurrentParams, clearParams } =
    useParams(filterGroups);

  const activeFilters = currentParams.reduce(
    (params, { name, value }) => {
      params[name] = value ? value.split(',') : null;
      return params;
    },
    {} as { [key: string]: string[] | null }
  );

  const updateParams = useCallback(
    (params: FilterParam[]) => {
      const newFilters = currentParams.map((filter) => {
        const matchedParam = params?.find(
          (p) => p.name === filter.name
        );
        return matchedParam
          ? { ...filter, value: matchedParam?.value }
          : filter;
      });
      setCurrentParams(newFilters);
    },
    [currentParams, setCurrentParams]
  );

  function updateFilter(name: string, value: string) {
    const active = activeFilters[name];
    const isActive = (value: string) =>
      active && active.includes(value);

    let newValue = value;
    if (active) {
      const hasValue = isActive(newValue);
      newValue = hasValue
        ? active.filter((v: string) => v !== newValue).join()
        : [...active, newValue].join();
    }

    updateParams([{ name, value: newValue }]);
  }

  function clearFilters() {
    clearParams();
  }

  return (
    <Context.Provider
      value={{
        activeFilters,
        updateFilter,
        clearFilters,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(Context);
  return context;
};
