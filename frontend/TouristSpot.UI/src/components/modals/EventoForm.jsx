import React from 'react';

export const EventoForm = ({ idInitialData }) => {
  return (
    <form className="row g-3">
      <div className="col-12">
        <label className="form-label small fw-bold">Nome do Evento *</label>
        <input
          type="text"
          className="form-control form-control-custom"
          placeholder="Nome do evento"
          required
        />
      </div>

      <div className="col-12">
        <label className="form-label small fw-bold">Endereço Completo *</label>
        <input
          type="text"
          className="form-control form-control-custom"
          placeholder="Endereço onde o evento ocorrerá"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-bold">Data de Início *</label>
        <input
          type="date"
          className="form-control form-control-custom"
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Hora de Início *</label>
        <input
          type="time"
          className="form-control form-control-custom"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-bold">Data de Término *</label>
        <input
          type="date"
          className="form-control form-control-custom"
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Hora de Término *</label>
        <input
          type="time"
          className="form-control form-control-custom"
          required
        />
      </div>

      <div className="col-12 text-end mt-4">
        <button
          type="button"
          className="btn-confirmar-evento"
        >
          {idInitialData ? 'Atualizar Evento' : 'Confirmar Evento'}
        </button>
      </div>
    </form>
  );
};