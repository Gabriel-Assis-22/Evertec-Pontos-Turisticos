import { useState } from 'react';
import EventoService from '../services/eventoService';

export const useEvento = () => {
  const [loading, setLoading] = useState(false);

  const cadastrarEvento = async (eventoData) => {
    setLoading(true);
    try {
      await EventoService.create(eventoData);
      return true;
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { cadastrarEvento, loading };
};