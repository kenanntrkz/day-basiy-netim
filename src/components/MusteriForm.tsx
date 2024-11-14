import { useState } from 'react';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useStore } from '../store/useStore';

export function MusteriForm() {
  const musteriEkle = useStore((state) => state.musteriEkle);
  const [form, setForm] = useState({
    adSoyad: '',
    lakap: '',
    telefon: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    musteriEkle(form);
    setForm({ adSoyad: '', lakap: '', telefon: '' });
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
      <Group justify="flex-end">
        <Button type="submit">Müşteri Ekle</Button>
      </Group>
    </Box>
  );
}