import { useState } from 'react';
import { TextInput, Button, Group, Box, Switch } from '@mantine/core';
import { useStore } from '../store/useStore';

export function IsciForm() {
  const isciEkle = useStore((state) => state.isciEkle);
  const [form, setForm] = useState({
    adSoyad: '',
    lakap: '',
    telefon: '',
    memleket: '',
    aktif: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isciEkle(form);
    setForm({ adSoyad: '', lakap: '', telefon: '', memleket: '', aktif: true });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextInput
        label="Ad Soyad"
        value={form.adSoyad}
        onChange={(e) => setForm({ ...form, adSoyad: e.target.value })}
        required
        mb="sm"
      />
      <TextInput
        label="Lakap"
        value={form.lakap}
        onChange={(e) => setForm({ ...form, lakap: e.target.value })}
        required
        mb="sm"
      />
      <TextInput
        label="Telefon"
        value={form.telefon}
        onChange={(e) => setForm({ ...form, telefon: e.target.value })}
        required
        mb="sm"
      />
      <TextInput
        label="Memleket"
        value={form.memleket}
        onChange={(e) => setForm({ ...form, memleket: e.target.value })}
        required
        mb="sm"
      />
      <Switch
        label="Aktif"
        checked={form.aktif}
        onChange={(e) => setForm({ ...form, aktif: e.target.checked })}
        mb="md"
      />
      <Group justify="flex-end">
        <Button type="submit">İşçi Ekle</Button>
      </Group>
    </Box>
  );
}