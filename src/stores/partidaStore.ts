import { create } from 'zustand';
import { Partida } from '@/lib/validators';

interface PartidaStore {
  partidas: Partida[];
  agregar: (partida: Partida) => void;
  eliminar: (numeroPartida: string) => void;
  actualizar: (numeroPartida: string, partida: Partida) => void;
  obtenerPorNumero: (numeroPartida: string) => Partida | undefined;
}

export const usePartidaStore = create<PartidaStore>((set, get) => ({
  partidas: [],
  
  agregar: (partida) =>
    set((state) => ({
      partidas: [...state.partidas, partida],
    })),
  
  eliminar: (numeroPartida) =>
    set((state) => ({
      partidas: state.partidas.filter(
        (p) => p.numeroPartida !== numeroPartida
      ),
    })),
  
  actualizar: (numeroPartida, partida) =>
    set((state) => ({
      partidas: state.partidas.map((p) =>
        p.numeroPartida === numeroPartida ? partida : p
      ),
    })),
  
  obtenerPorNumero: (numeroPartida) => {
    const state = get();
    return state.partidas.find((p) => p.numeroPartida === numeroPartida);
  },
}));