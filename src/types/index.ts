export interface Isci {
  id: string;
  adSoyad: string;
  lakap: string;
  telefon: string;
  memleket: string;
  aktif: boolean;
  durum: 'müsait' | 'görevde';
}

export interface Musteri {
  id: string;
  adSoyad: string;
  lakap: string;
  telefon: string;
}

export interface IsciAtama {
  id: string;
  musteriId: string;
  isciler: string[];
  tarih: string;
  gunlukUcret: number;
  ucretOdendi: boolean;
}