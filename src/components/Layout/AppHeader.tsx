import { Group, Burger, Container, Title } from '@mantine/core';

interface AppHeaderProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

export function AppHeader({ opened, setOpened }: AppHeaderProps) {
  return (
    <Container size="xl">
      <Group h="100%" px="md" justify="space-between">
        <Group>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            hiddenFrom="sm"
            size="sm"
          />
          <Title order={3} c="teal.9">Dayıbaşı Yönetim Sistemi</Title>
        </Group>
      </Group>
    </Container>
  );
}