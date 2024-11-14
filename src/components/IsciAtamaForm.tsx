import { useState } from 'react';
import { Select, Button, Group, Stack, NumberInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useStore } from '../store/useStore';
import { IsciList } from './IsciList';

export function IsciAtamaForm() {
  const { musteriler, atamaYap } = useStore();
  const [seciliIsciler, setSeciliIsciler] = useState<string[]>([]);
  const [musteriId, setMusteriId] = useState<string | null>(null);
  const [tarih, setTarih] = useState<Date | null>(null);
  const [gunlukUcret, setGunlukUcret] = useState<number>(400);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!musteriId || !tarih || seciliIsciler.length === 0) return;

    try {
      atamaYap({
        musteriId,
        isciler: seciliIsciler,
        tarih: tarih.toISOString(),
        gunlukUcret
      });

      // Form reset
      setSeciliIsciler([]);
      setMusteriId(null);
      setTarih(null);
      setGunlukUcret(400);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleUcretChange = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseInt(value) : value;
    setGunlukUcret(isNaN(numValue) ? 400 : numValue);
  };

  return (
    <Stack gap="md">
      <Select
        label="Müşteri Seç"
        placeholder="Müşteri seçin"
        value={musteriId}
        onChange={setMusteriId}
        data={musteriler.map(m => ({ value: m.id, label: `${m.adSoyad} (${m.lakap})` }))}
        searchable
        clearable
        required
      />

      <DateInput
        label="Tarih"
        value={tarih}
        onChange={setTarih}
        locale="tr"
        required
        clearable
      />

      <NumberInput
        label="Günlük Ücret (₺)"
        value={gunlukUcret}
        onChange={handleUcretChange}
        min={0}
        required
        defaultValue={400}
      />

      <IsciList onSelect={setSeciliIsciler} secimTarihi={tarih} />

      <Group justify="flex-end">
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={!musteriId || !tarih || seciliIsciler.length === 0}
        >
          Atama Yap
        </Button>
      </Group>
    </Stack>
  );
}