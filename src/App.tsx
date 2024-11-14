import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { AppShell, Container } from '@mantine/core';
import { AppNavbar } from './components/Layout/AppNavbar';
import { TabPanels } from './components/Layout/TabPanels';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/tr';
import { useState } from 'react';
import { theme } from './theme';

function App() {
  const [activeTab, setActiveTab] = useState<string | null>('welcome');

  return (
    <MantineProvider theme={theme}>
      <DatesProvider settings={{ locale: 'tr' }}>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: false }
          }}
          padding="md"
        >
          <AppShell.Header>
            <Container size="xl" h="100%" px="md">
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
                  Dayıbaşı Yönetim Sistemi
                </h1>
              </div>
            </Container>
          </AppShell.Header>

          <AppShell.Navbar p="md">
            <AppNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
          </AppShell.Navbar>

          <AppShell.Main>
            <Container size="xl">
              <TabPanels activeTab={activeTab} />
            </Container>
          </AppShell.Main>
        </AppShell>
      </DatesProvider>
    </MantineProvider>
  );
}

export default App;