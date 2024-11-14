import { Card, Text, Group, SimpleGrid, Badge, Button, Transition } from '@mantine/core';
import { useStore } from '../store/useStore';
import { IconUser, IconUsers, IconCash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';

dayjs.locale('tr');

export function AtamaGecmisi() {
  const { atamalar, musteriler, isciler, ucretOde } = useStore();

  const formatTarih = (tarih: string) => {
    return dayjs(tarih).format('DD MMMM YYYY');
  };

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      {atamalar.map((atama) => {
        const musteri = musteriler.find(m => m.id === atama.musteriId);
        const atamaIsciler = isciler.filter(i => atama.isciler.includes(i.id));
        
        return (
          <Transition mounted={true} transition="fade" duration={400} key={atama.id}>
            {(styles) => (
              <Card shadow="sm" padding="lg" radius="md" withBorder style={styles}>
                <Group justify="apart" mb="xs">
                  <Group>
                    <IconUser size="1.2rem" />
                    <Text fw={500}>{musteri?.adSoyad}</Text>
                  </Group>
                  <Group>
                    <Badge variant="light">{formatTarih(atama.tarih)}</Badge>
                    <Badge color={atama.ucretOdendi ? 'green' : 'red'} variant="light">
                      {atama.ucretOdendi ? 'Ödendi' : 'Ödenmedi'}
                    </Badge>
                  </Group>
                </Group>
                
                <Text size="sm" c="dimmed" mb="xs">
                  <IconUser size="1rem" style={{ display: 'inline', marginRight: '5px' }} />
                  Müşteri Lakap: {musteri?.lakap}
                </Text>
                
                <Text size="sm" c="dimmed" mb="xs">
                  <IconCash size="1rem" style={{ display: 'inline', marginRight: '5px' }} />
                  Günlük Ücret: {atama.gunlukUcret}₺
                </Text>
                
                <Group align="flex-start" mt="md">
                  <IconUsers size="1rem" />
                  <div>
                    <Text fw={500} size="sm">İşçiler:</Text>
                    {atamaIsciler.map(isci => (
                      <Text key={isci.id} size="sm" c="dimmed">
                        • {isci.adSoyad} ({isci.lakap})
                      </Text>
                    ))}
                  </div>
                </Group>
                
                <Group justify="apart" mt="md">
                  <Badge size="lg" variant="dot" color="blue">
                    Toplam: {atama.gunlukUcret * atamaIsciler.length}₺
                  </Badge>
                  {!atama.ucretOdendi && (
                    <Button size="xs" color="green" variant="light" onClick={() => ucretOde(atama.id)}>
                      Ücret Ödendi
                    </Button>
                  )}
                </Group>
              </Card>
            )}
          </Transition>
        );
      })}
    </SimpleGrid>
  );
}