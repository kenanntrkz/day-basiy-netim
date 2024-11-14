import { TextInput, Select, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface SearchAndFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: { value: string; label: string }[];
  searchPlaceholder?: string;
  filterPlaceholder?: string;
}

export function SearchAndFilter({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions,
  searchPlaceholder = 'Ara...',
  filterPlaceholder = 'Filtrele'
}: SearchAndFilterProps) {
  return (
    <Group grow>
      <TextInput
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        leftSection={<IconSearch size="1rem" />}
      />
      <Select
        placeholder={filterPlaceholder}
        value={filterValue}
        onChange={(value) => onFilterChange(value || '')}
        data={filterOptions}
        clearable
      />
    </Group>
  );
}