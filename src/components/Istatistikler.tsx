import { Card, Text, Group, SimpleGrid, RingProgress, Stack } from '@mantine/core';
import { useStore } from '../store/useStore';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';

dayjs.locale('tr');

export function Istatistikler() {
  const store = useStore();
  const buAy = dayjs().month();
  const buYil = dayjs().year();
  const aylikRapor = store.getAylikRapor(buAy, buYil);

  const formatParaBirimi = (deger: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(deger);
  };

  const odenmeOrani = aylikRapor.toplamGelir === 0 ? 0 :
    ((aylikRapor.toplamGelir - aylikRapor.odenmemisUcretler) / aylikRapor.toplamGelir) * 100;

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack align="center" gap="md">
          <Text size="lg" fw={500}>Aylık Özet</Text>
          <RingProgress
            sections={[{ value: odenmeOrani, color: 'teal' }]}
            label={
              <Text ta="center" size="xl" fw={700}>
                {Math.round(odenmeOrani)}%
              </Text>
            }
          />
          <Stack gap="xs">
            <Text size="sm">Toplam Atama: {aylikRapor.toplamAtama}</Text>
            <Text size="sm">Toplam Gelir: {formatParaBirimi(aylikRapor.toplamGelir)}</Text>
            <Text size="sm" c="red">
              Ödenmemiş: {formatParaBirimi(aylikRapor.odenmemisUcretler)}
            </Text>
          </Stack>
        </Stack>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" fw={500} mb="md">En Aktif İşçiler</Text>
        {store.isciler
          .map(isci => ({
            ...isci,
            performans: store.getIsciPerformans(isci.id)
          }))
          .sort((a, b) => b.performans.toplamAtama - a.performans.toplamAtama)
          .slice(0, 5)
          .map(isci => (
            <Group key={isci.id} justify="space-between" mb="xs">
              <Text size="sm">{isci.adSoyad}</Text>
              <Text size="sm" fw={500}>{isci.performans.toplamAtama} atama</Text>
            </Group>
          ))}
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" fw={500} mb="md">En Çok Çalışılan Müşteriler</Text>
        {store.musteriler
          .map(musteri => ({
            ...musteri,
            istatistik: store.getMusteriIstatistik(musteri.id)
          }))
          .sort((a, b) => b.istatistik.toplamAtama - a.istatistik.toplamAtama)
          .slice(0, 5)
          .map(musteri => (
            <Group key={musteri.id} justify="space-between" mb="xs">
              <Text size="sm">{musteri.adSoyad}</Text>
              <Text size="sm" fw={500}>
                {formatParaBirimi(musteri.istatistik.toplamOdeme)}
              </Text>
            </Group>
          ))}
      </Card>
    </SimpleGrid>
  );
}