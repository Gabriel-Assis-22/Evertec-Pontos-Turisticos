import React, { useState, useEffect } from 'react';
import EventoService from '../../services/eventoService';

export const EventoForm = ({ pontoId, initialData, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pontoTuristicoId: pontoId || '',
    nome: '',
    endereco: '',
    dataInicio: '',
    horaInicio: '',
    dataFim: '',
    horaFim: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        pontoTuristicoId: initialData.pontoTuristicoId,
        dataInicio: initialData.dataInicio ? initialData.dataInicio.split('T')[0] : "",
        horaInicio: initialData.dataInicio ? initialData.dataInicio.split('T')[1].substring(0, 5) : "",
        dataFim: initialData.dataFim ? initialData.dataFim.split('T')[0] : "",
        horaFim: initialData.dataFim ? initialData.dataFim.split('T')[1].substring(0, 5) : ""
      });
    } else {
      setFormData({
        pontoTuristicoId: pontoId, nome: '', endereco: '', dataInicio: '', horaInicio: '', dataFim: '', horaFim: ''
      });
    }
  }, [initialData, pontoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        pontoTuristicoId: initialData?.pontoTuristicoId || pontoId,
        dataInicio: `${formData.dataInicio}T${formData.horaInicio}:00`,
        dataFim: `${formData.dataFim}T${formData.horaFim}:00`,
      };

      if (initialData?.id) {
        await EventoService.update(initialData.id, payload);
        alert("Evento atualizado com sucesso!");
      } else {
        await EventoService.create(payload);
        alert("Evento criado com sucesso!");
      }

      onSave(); 

      window.bootstrap.Modal.getInstance(document.getElementById('modalEvento'))?.hide();
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      alert("Erro ao salvar o evento. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-12">
        <label className="form-label small fw-bold">Nome do Evento *</label>
        <input
          type="text"
          className="form-control form-control-custom"
          placeholder="Nome do evento"
          required
          value={formData.nome}
          onChange={e => setFormData({ ...formData, nome: e.target.value })}
        />
      </div>

      <div className="col-12">
        <label className="form-label small fw-bold">Endereço Completo *</label>
        <input
          type="text"
          className="form-control form-control-custom"
          placeholder="Endereço onde o evento ocorrerá"
          required
          value={formData.endereco}
          onChange={e => setFormData({ ...formData, endereco: e.target.value })}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-bold">Data de Início *</label>
        <input
          type="date"
          className="form-control form-control-custom"
          required
          value={formData.dataInicio}
          onChange={e => setFormData({ ...formData, dataInicio: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Hora de Início *</label>
        <input
          type="time"
          className="form-control form-control-custom"
          required
          value={formData.horaInicio}
          onChange={e => setFormData({ ...formData, horaInicio: e.target.value })}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-bold">Data de Término *</label>
        <input
          type="date"
          className="form-control form-control-custom"
          required
          value={formData.dataFim}
          onChange={e => setFormData({ ...formData, dataFim: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Hora de Término *</label>
        <input
          type="time"
          className="form-control form-control-custom"
          required
          value={formData.horaFim}
          onChange={e => setFormData({ ...formData, horaFim: e.target.value })}
        />
      </div>

      <div className="col-12 text-end mt-4">
        <button
          type="submit"
          className="btn-confirmar-evento"
          disabled={loading}
        >
          {loading ? 'Processando...' : (initialData?.id ? 'Atualizar Evento' : 'Confirmar Evento')}
        </button>
      </div>
    </form>
  );
};