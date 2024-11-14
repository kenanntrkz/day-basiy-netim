import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Isci, Musteri, IsciAtama } from '../types';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface Store {
  isciler: Isci[];
  musteriler: Musteri[];
  atamalar: IsciAtama[];
  isciEkle: (isci: Omit<Isci, 'id' | 'durum'>) => void;
  isciDuzenle: (id: string, isci: Omit<Isci, 'id' | 'durum'>) => void;
  isciSil: (id: string) => void;
  musteriEkle: (musteri: Omit<Musteri, 'id'>) => void;
  musteriDuzenle: (id: string, musteri: Omit<Musteri, 'id'>) => void;
  musteriSil: (id: string) => void;
  atamaYap: (atama: Omit<IsciAtama, 'id' | 'ucretOdendi'>) => void;
  ucretOde: (atamaId: string) => void;
  isciMusaitMi: (isciId: string, tarih: string) => boolean;
  getIsciPerformans: (isciId: string) => {
    toplamAtama: number;
    toplamKazanc: number;
    sonAtamaTarihi: string | null;
  };
  getMusteriIstatistik: (musteriId: string) => {
    toplamAtama: number;
    toplamOdeme: number;
    sonAtamaTarihi: string | null;
  };
  getAylikRapor: (ay: number, yil: number) => {
    toplamAtama: number;
    toplamGelir: number;
    odenmemisUcretler: number;
  };
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      isciler: [],
      musteriler: [],
      atamalar: [],
      
      isciEkle: (isci) => {
        set((state) => ({
          isciler: [...state.isciler, { ...isci, id: crypto.randomUUID(), durum: 'müsait' }]
        }));
      },

      isciDuzenle: (id, isci) => {
        set((state) => ({
          isciler: state.isciler.map(i => i.id === id ? { ...i, ...isci } : i)
        }));
      },

      isciSil: (id) => {
        set((state) => ({
          isciler: state.isciler.filter(i => i.id !== id)
        }));
      },
      
      musteriEkle: (musteri) => set((state) => ({
        musteriler: [...state.musteriler, { ...musteri, id: crypto.randomUUID() }]
      })),

      musteriDuzenle: (id, musteri) => set((state) => ({
        musteriler: state.musteriler.map(m => m.id === id ? { ...musteri, id } : m)
      })),

      musteriSil: (id) => set((state) => ({
        musteriler: state.musteriler.filter(m => m.id !== id)
      })),
      
      isciMusaitMi: (isciId: string, tarih: string) => {
        const atamalar = get().atamalar;
        const kontrolTarihi = dayjs(tarih).startOf('day');
        const isci = get().isciler.find(i => i.id === isciId);
        
        if (!isci?.aktif) return false;
        
        return !atamalar.some(atama => {
          const atamaTarihi = dayjs(atama.tarih).startOf('day');
          return atamaTarihi.isSame(kontrolTarihi) && atama.isciler.includes(isciId);
        });
      },
      
      atamaYap: (atama) => {
        const tumIscilerMusait = atama.isciler.every(isciId => 
          get().isciMusaitMi(isciId, atama.tarih)
        );

        if (!tumIscilerMusait) {
          throw new Error('Seçilen işçilerden bazıları bu tarihte müsait değil!');
        }

        set((state) => ({
          atamalar: [...state.atamalar, { ...atama, id: crypto.randomUUID(), ucretOdendi: false }]
        }));
      },

      ucretOde: (atamaId) => {
        set((state) => ({
          atamalar: state.atamalar.map(a => 
            a.id === atamaId ? { ...a, ucretOdendi: true } : a
          )
        }));
      },

      getIsciPerformans: (isciId) => {
        const atamalar = get().atamalar.filter(a => a.isciler.includes(isciId));
        const toplamKazanc = atamalar.reduce((acc, curr) => acc + curr.gunlukUcret, 0);
        const sonAtama = atamalar.sort((a, b) => 
          dayjs(b.tarih).valueOf() - dayjs(a.tarih).valueOf()
        )[0];

        return {
          toplamAtama: atamalar.length,
          toplamKazanc,
          sonAtamaTarihi: sonAtama?.tarih || null
        };
      },

      getMusteriIstatistik: (musteriId) => {
        const atamalar = get().atamalar.filter(a => a.musteriId === musteriId);
        const toplamOdeme = atamalar.reduce((acc, curr) => 
          acc + (curr.gunlukUcret * curr.isciler.length), 0
        );
        const sonAtama = atamalar.sort((a, b) => 
          dayjs(b.tarih).valueOf() - dayjs(a.tarih).valueOf()
        )[0];

        return {
          toplamAtama: atamalar.length,
          toplamOdeme,
          sonAtamaTarihi: sonAtama?.tarih || null
        };
      },

      getAylikRapor: (ay, yil) => {
        const atamalar = get().atamalar.filter(atama => {
          const atamaTarihi = dayjs(atama.tarih);
          return atamaTarihi.month() === ay && atamaTarihi.year() === yil;
        });

        const toplamGelir = atamalar.reduce((acc, curr) => 
          acc + (curr.gunlukUcret * curr.isciler.length), 0
        );

        const odenmemisUcretler = atamalar
          .filter(a => !a.ucretOdendi)
          .reduce((acc, curr) => 
            acc + (curr.gunlukUcret * curr.isciler.length), 0
          );

        return {
          toplamAtama: atamalar.length,
          toplamGelir,
          odenmemisUcretler
        };
      }
    }),
    {
      name: 'dayibasi-store'
    }
  )
);