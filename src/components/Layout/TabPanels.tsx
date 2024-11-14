import { Tabs, Stack } from '@mantine/core';
import { Welcome } from '../Welcome';
import { IsciForm } from '../IsciForm';
import { MusteriForm } from '../MusteriForm';
import { IsciList } from '../IsciList';
import { MusteriList } from '../MusteriList';
import { IsciAtamaForm } from '../IsciAtamaForm';
import { AtamaGecmisi } from '../AtamaGecmisi';
import { Istatistikler } from '../Istatistikler';

interface TabPanelsProps {
  activeTab: string | null;
}

export function TabPanels({ activeTab }: TabPanelsProps) {
  return (
    <Tabs value={activeTab}>
      <Tabs.Panel value="welcome">
        <Welcome />
      </Tabs.Panel>

      <Tabs.Panel value="isciler">
        <Stack gap="lg">
          <IsciForm />
          <IsciList />
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="musteriler">
        <Stack gap="lg">
          <MusteriForm />
          <MusteriList />
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="atama">
        <IsciAtamaForm />
      </Tabs.Panel>

      <Tabs.Panel value="gecmis">
        <AtamaGecmisi />
      </Tabs.Panel>

      <Tabs.Panel value="istatistikler">
        <Istatistikler />
      </Tabs.Panel>
    </Tabs>
  );
}