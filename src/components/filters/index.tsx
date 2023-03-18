import { useFiltersContext } from '@/context/filters';
import useDropdown from '@/hooks/useDropdown';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { RiEqualizerFill, RiEqualizerLine } from 'react-icons/ri';

export type FilterGroup = {
  name: string;
  filters: FilterProps[];
};

type Props = {
  filterGroups: FilterGroup[];
};

function Filters({ filterGroups }: Props) {
  const { clearFilters, activeFilters } = useFiltersContext();
  const { toggle, visible } = useDropdown();
  const count =
    !activeFilters || !activeFilters.tags
      ? 0
      : activeFilters.tags.length;

  return (
    <>
      <div className="relative z-20 flex items-center justify-between">
        <button className="text-3xl" onClick={toggle}>
          {visible ? <RiEqualizerFill /> : <RiEqualizerLine />}
        </button>
        {count > 0 && (
          <button className="font-semibold" onClick={clearFilters}>
            clear all
          </button>
        )}
      </div>
      {visible && (
        <div className="fixed top-0 left-0 z-10 mt-4 h-full w-full gap-1 space-y-4 px-8 py-24 text-lg md:static md:top-5 md:p-0">
          <div className="absolute top-0 left-0 h-full w-full bg-pageBG md:hidden" />
          {filterGroups.map(({ filters, name }) => (
            <FilterGroup name={name} filters={filters} key={name} />
          ))}
        </div>
      )}
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
    <div key={name} className="relative my-4 grid gap-4">
      <div className="font-semibold capitalize">{name}</div>
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
  const cn = clsx(
    'inline-block w-3 h-3 border-pageText transition-colors',
    active ? 'border-2 bg-pageText' : 'bg-pageBG border-2'
  );
  return (
    <div>
      <button
        className="flex cursor-pointer items-center gap-2"
        onClick={() => onClick(name, filter.slug)}
      >
        <motion.span className={cn} />
        <span>{filter.slug}</span>
      </button>
    </div>
  );
}

export default Filters;
