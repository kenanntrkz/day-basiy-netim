import { Card, SimpleGrid, Box, Group, Text, Badge } from '@mantine/core';
import { useStore } from '../store/useStore';
import { useState } from 'react';
import { IconUser, IconPhone } from '@tabler/icons-react';
import { SearchAndFilter } from './SearchAndFilter';

export function MusteriList() {
  const { musteriler, getMusteriIstatistik } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const filterOptions = [
    { value: 'aktif', label: 'Aktif Müşteriler' },
    { value: 'pasif', label: 'Pasif Müşteriler' }
  ];

  const filteredMusteriler = musteriler.filter(musteri => {
    const searchMatch = 
      musteri.adSoyad.toLowerCase().includes(searchQuery.toLowerCase()) ||
      musteri.lakap.toLowerCase().includes(searchQuery.toLowerCase());

    if (!searchMatch) return false;

    const istatistik = getMusteriIstatistik(musteri.id);

    switch (filterValue) {
      case 'aktif':
        return istatistik.sonAtamaTarihi !== null;
      case 'pasif':
        return istatistik.sonAtamaTarihi === null;
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
        searchPlaceholder="İsim veya lakap ara..."
        filterPlaceholder="Duruma göre filtrele"
      />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md" mt="md">
        {filteredMusteriler.map((musteri) => {
          const istatistik = getMusteriIstatistik(musteri.id);
          
          return (
            <Card key={musteri.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Text fw={500}>{musteri.adSoyad}</Text>
                <Badge color={istatistik.sonAtamaTarihi ? 'green' : 'gray'}>
                  {istatistik.sonAtamaTarihi ? 'Aktif' : 'Pasif'}
                </Badge>
              </Group>

              <Group gap="xs" mb="xs">
                <IconUser size="1rem" />
                <Text size="sm">{musteri.lakap}</Text>
              </Group>

              <Group gap="xs" mb="xs">
                <IconPhone size="1rem" />
                <Text size="sm">{musteri.telefon}</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Toplam Atama: {istatistik.toplamAtama}
              </Text>
              <Text size="sm" c="dimmed">
                Toplam Ödeme: {istatistik.toplamOdeme}₺
              </Text>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}