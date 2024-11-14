import { Card, SimpleGrid, Box, Checkbox, Group, Text, Badge } from '@mantine/core';
import { useStore } from '../store/useStore';
import { useState } from 'react';
import { IconUser, IconPhone, IconMapPin } from '@tabler/icons-react';
import { SearchAndFilter } from './SearchAndFilter';

interface IsciListProps {
  onSelect?: (seciliIsciler: string[]) => void;
  secimTarihi?: Date | null;
}

export function IsciList({ onSelect }: IsciListProps) {
  const { isciler } = useStore();
  const [seciliIsciler, setSeciliIsciler] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const filterOptions = [
    { value: 'aktif', label: 'Aktif İşçiler' },
    { value: 'pasif', label: 'Pasif İşçiler' },
    { value: 'musait', label: 'Müsait İşçiler' },
    { value: 'gorevde', label: 'Görevde Olanlar' }
  ];

  const handleIsciSecim = (isciId: string) => {
    const yeniSeciliIsciler = seciliIsciler.includes(isciId)
      ? seciliIsciler.filter(id => id !== isciId)
      : [...seciliIsciler, isciId];
    
    setSeciliIsciler(yeniSeciliIsciler);
    if (onSelect) {
      onSelect(yeniSeciliIsciler);
    }
  };

  const filteredIsciler = isciler.filter(isci => {
    const searchMatch = 
      isci.adSoyad.toLowerCase().includes(searchQuery.toLowerCase()) ||
      isci.lakap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      isci.memleket.toLowerCase().includes(searchQuery.toLowerCase());

    if (!searchMatch) return false;

    switch (filterValue) {
      case 'aktif':
        return isci.aktif;
      case 'pasif':
        return !isci.aktif;
      case 'musait':
        return isci.durum === 'müsait' && isci.aktif;
      case 'gorevde':
        return isci.durum === 'görevde';
      default:
        return true;
    }
  });

  return (
    <Box>
      <SearchAndFilter
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        filterOptions={filterOptions}
        searchPlaceholder="İsim, lakap veya memleket ara..."
        filterPlaceholder="Duruma göre filtrele"
      />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md" mt="md">
        {filteredIsciler.map((isci) => (
          <Card key={isci.id} shadow="sm" padding="lg" radius="md" withBorder>
            {onSelect && (
              <Checkbox
                checked={seciliIsciler.includes(isci.id)}
                onChange={() => handleIsciSecim(isci.id)}
                mb="xs"
              />
            )}
            <Group justify="space-between" mb="xs">
              <Text fw={500}>{isci.adSoyad}</Text>
              <Badge color={isci.aktif ? 'green' : 'red'}>
                {isci.aktif ? 'Aktif' : 'Pasif'}
              </Badge>
            </Group>

            <Group gap="xs" mb="xs">
              <IconUser size="1rem" />
              <Text size="sm">{isci.lakap}</Text>
            </Group>

            <Group gap="xs" mb="xs">
              <IconPhone size="1rem" />
              <Text size="sm">{isci.telefon}</Text>
            </Group>

            <Group gap="xs">
              <IconMapPin size="1rem" />
              <Text size="sm">{isci.memleket}</Text>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}