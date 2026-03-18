import { useState } from 'react';
import CepService from '../services/cepService';

export const useCep = () => {
  const [loadingCep, setLoadingCep] = useState(false);

  const buscarEndereco = async (cep) => {
    // Limpa o CEP para ter apenas números
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) return null;

    setLoadingCep(true);
    try {
      const dados = await CepService.consultar(cepLimpo);
      return dados; // Retorna { logradouro, bairro, cidade, estado }
    } catch (error) {
      console.error("Erro no Hook useCep:", error);
      return null;
    } finally {
      setLoadingCep(false);
    }
  };

  return { buscarEndereco, loadingCep };
};