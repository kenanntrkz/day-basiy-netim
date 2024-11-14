import { Tabs } from '@mantine/core';
import { IconHome, IconUsers, IconUserCircle, IconClipboardList, IconHistory, IconChartBar } from '@tabler/icons-react';

interface AppNavbarProps {
  activeTab: string | null;
  setActiveTab: (value: string | null) => void;
}

export function AppNavbar({ activeTab, setActiveTab }: AppNavbarProps) {
  return (
    <Tabs
      value={activeTab}
      onChange={setActiveTab}
      orientation="vertical"
      variant="pills"
    >
      <Tabs.List>
        <Tabs.Tab value="welcome" leftSection={<IconHome size="1rem" />}>
          Ana Sayfa
        </Tabs.Tab>
        <Tabs.Tab value="isciler" leftSection={<IconUsers size="1rem" />}>
          İşçiler
        </Tabs.Tab>
        <Tabs.Tab value="musteriler" leftSection={<IconUserCircle size="1rem" />}>
          Müşteriler
        </Tabs.Tab>
        <Tabs.Tab value="atama" leftSection={<IconClipboardList size="1rem" />}>
          İşçi Atama
        </Tabs.Tab>
        <Tabs.Tab value="gecmis" leftSection={<IconHistory size="1rem" />}>
          Atama Geçmişi
        </Tabs.Tab>
        <Tabs.Tab value="istatistikler" leftSection={<IconChartBar size="1rem" />}>
          İstatistikler
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}