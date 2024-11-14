import { Title, Text, Button, Container, Group, List, ThemeIcon, rem, Box, Paper, Card } from '@mantine/core';
import { IconCheck, IconCircleCheck } from '@tabler/icons-react';

export function Welcome() {
  return (
    <Box>
      <Container size="lg" pos="relative">
        <Paper
          shadow="xl"
          p="xl"
          radius="lg"
          mb="xl"
          style={{
            backgroundImage: 'linear-gradient(135deg, var(--mantine-color-teal-6) 0%, var(--mantine-color-cyan-6) 100%)',
            color: 'var(--mantine-color-white)'
          }}
        >
          <Title order={1} size="h2" fw={900} ta="center">
            Dayıbaşı Yönetim Sistemine Hoş Geldiniz
          </Title>
          <Text size="lg" ta="center" mt="sm">
            İşçi ve müşteri yönetimini kolaylaştıran, modern ve kullanıcı dostu bir platform.
          </Text>
          <Group justify="center" mt="xl">
            <Button variant="white" color="teal">
              Hemen Başla
            </Button>
          </Group>
        </Paper>

        <Group grow align="stretch">
          {features.map((feature) => (
            <Card
              key={feature.title}
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
            >
              <Group justify="apart" mb="xs">
                <Text fw={500}>{feature.title}</Text>
                <ThemeIcon
                  color="teal"
                  variant="light"
                  size={30}
                  radius="xl"
                >
                  <IconCircleCheck style={{ width: rem(18), height: rem(18) }} />
                </ThemeIcon>
              </Group>
              <Text size="sm" c="dimmed">
                {feature.description}
              </Text>
            </Card>
          ))}
        </Group>

        <Card
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          mt="xl"
        >
          <Title order={2} size="h3" mb="md">
            Özellikler
          </Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCheck style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
            {features.map((feature, index) => (
              <List.Item key={index}>
                <Text fw={500}>{feature.title}</Text>
                <Text size="sm" mb="xs" c="dimmed">
                  {feature.description}
                </Text>
              </List.Item>
            ))}
          </List>
        </Card>
      </Container>
    </Box>
  );
}

const features = [
  {
    title: 'İşçi Yönetimi',
    description: 'İşçilerinizin bilgilerini kolayca yönetin ve takip edin.'
  },
  {
    title: 'Müşteri Takibi',
    description: 'Müşterilerinizin bilgilerini ve taleplerini organize edin.'
  },
  {
    title: 'Atama Sistemi',
    description: 'İşçileri müşterilere kolayca atayın ve takip edin.'
  }
];