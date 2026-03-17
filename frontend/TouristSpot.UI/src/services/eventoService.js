import api from "./api";

const EventoService = {
    getAll: async () => {
        const response = await api.getAll('/Evento');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.getById(`/Evento/${id}`);
        return response.data;
    },

    create: async (eventoData) => {
        const response = await api.post('/Evento', eventoData);
        return response;
    },

    update: async (id, eventoData) => {
        const response = await api.put(`/Evento/${id}`, eventoData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/Evento/${id}`);
        return response.data;
    }
}

export default EventoService;