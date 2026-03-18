import api from './api';

const PontoTuristicoService = {
    getAll: async () => {
        const response = await api.get('/api/PontoTuristico');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/api/PontoTuristico/${id}`);
        return response.data;
    },

    create: async (pontoData) => {
        const response = await api.post('/api/PontoTuristico', pontoData);
        return response.data;
    },

    update: async (id, pontoData) => {
        const response = await api.put(`/api/PontoTuristico/${id}`, pontoData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/api/PontoTuristico/${id}`);
        return response.data;
    },

    search: async (query) => {
        const response = await api.get(`/api/PontoTuristico/search`, {
            params: { q: query }
        });
        return response.data;
    }
}

export default PontoTuristicoService;