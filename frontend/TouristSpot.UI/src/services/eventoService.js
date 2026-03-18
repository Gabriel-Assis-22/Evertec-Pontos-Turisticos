import api from "./api";

const EventoService = {
    getAll: async () => {
        // Corrigido de .getAll para .get e adicionado /api
        const response = await api.get('/api/Eventos'); 
        return response.data;
    },

    getById: async (id) => {
        // Corrigido de .getById para .get e adicionado /api
        const response = await api.get(`/api/Eventos/${id}`);
        return response.data;
    },

    create: async (eventoData) => {
        // Adicionado /api
        const response = await api.post('/api/Eventos', eventoData);
        return response.data; // Retorne .data para manter o padrão
    },

    update: async (id, eventoData) => {
        // Adicionado /api
        const response = await api.put(`/api/Eventos/${id}`, eventoData);
        return response.data;
    },

    delete: async (id) => {
        // Adicionado /api
        const response = await api.delete(`/api/Eventos/${id}`);
        return response.data;
    }
}

export default EventoService;