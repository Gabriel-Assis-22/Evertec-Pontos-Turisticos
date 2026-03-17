import api from './api';

const CategoriaService = {

  getAll: async () => {
    const response = await api.get('/Categoria');
    return response.data;
  }
};

export default CategoriaService;