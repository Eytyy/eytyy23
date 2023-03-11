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
    <div>
      <div className="flex items-center justify-between">
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
        <div className="text-lg">
          {filterGroups.map(({ filters, name }) => (
            <FilterGroup name={name} filters={filters} key={name} />
          ))}
        </div>
      )}
    </div>
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
    <div
      key={name}
      style={{ columnGap: '24px', rowGap: '8px' }}
      className="my-4 flex flex-wrap items-center"
    >
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
    <button
      className="flex cursor-pointer items-center gap-2"
      onClick={() => onClick(name, filter.slug)}
    >
      <motion.span className={cn} />
      <span>{filter.slug}</span>
    </button>
  );
}

export default Filters;
