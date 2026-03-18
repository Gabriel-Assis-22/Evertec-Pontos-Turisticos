import api from './api';

const PontoTuristicoService = {
    getAll: async () => {
        const response = await api.get('/PontoTuristico');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.getById(`/PontoTuristico/${id}`);
        return response.data;
    },

    create: async (pontoData) => {
        const response = await api.post('/PontoTuristico', pontoData);
        return response.data;
    },

    update: async (id, pontoData) => {
        const response = await api.put(`/PontoTuristico/${id}`, pontoData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/PontoTuristico/${id}`);
        return response.data;
    },

    search: async (query) => {
        const response = await api.get(`/PontoTuristico/search`, {
            params: { q: query }
        });
        return response.data;
    }
}

export default PontoTuristicoService;