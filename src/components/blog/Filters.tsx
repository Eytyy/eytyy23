import { useFiltersContext } from '@/context/filters';
import useDropdown from '@/hooks/useDropdown';
import clsx from 'clsx';

export type FilterGroup = {
  name: string;
  filters: FilterProps[];
};

type Props = {
  filterGroups: FilterGroup[];
};

function Filters({ filterGroups }: Props) {
  const { clearFilters, activeFilters } = useFiltersContext();
  const count =
    !activeFilters || !activeFilters.tags
      ? 0
      : activeFilters.tags.length;

  return (
    <>
      {filterGroups.map(({ filters, name }) => (
        <FilterGroup name={name} filters={filters} key={name} />
      ))}
    </>
  );
}

export type FilterProps = {
  slug: string;
  title: string;
  _id: string;
};

function FilterGroup({ name, filters }: FilterGroup) {
  const { activeFilters, updateFilter } = useFiltersContext();
  return (
    <div key={name} className="relative flex gap-4">
      {/* <div className="font-semibold capitalize">{name}</div> */}
      {filters.map((filter) => {
        return (
          <Filter
            activeFilters={activeFilters}
            name={name}
            key={filter._id}
            filter={filter}
            onClick={updateFilter}
          />
        );
      })}
    </div>
  );
}

function Filter({
  filter,
  name,
  onClick,
  activeFilters,
}: {
  filter: FilterProps;
  name: string;
  onClick: (group: string, value: string) => void;
  activeFilters: any;
}) {
  const activeGroupFilters = activeFilters && activeFilters[name];
  const active = activeGroupFilters
    ? activeGroupFilters.some((f: string) => f === filter.slug)
    : false;

  return (
    <div>
      <button
        className="flex cursor-pointer items-center gap-2"
        onClick={() => onClick(name, filter.slug)}
      >
        <span className={clsx(active && 'font-medium underline')}>
          #{filter.slug}
        </span>
      </button>
    </div>
  );
}

export default Filters;
