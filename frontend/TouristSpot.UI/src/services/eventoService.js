import api from "./api";

const EventoService = {
    getAll: async () => {
        const response = await api.getAll('/Eventos');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.getById(`/Eventos/${id}`);
        return response.data;
    },

    create: async (eventoData) => {
        const response = await api.post('/Eventos', eventoData);
        return response;
    },

    update: async (id, eventoData) => {
        const response = await api.put(`/Eventos/${id}`, eventoData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/Eventos/${id}`);
        return response.data;
    }
}

export default EventoService;