import React, { useState } from 'react';
import { MapPin, Clock, ChevronDown, Calendar, Trash2, Plus, Edit2 } from 'lucide-react';

const CATEGORIAS_ENUM = {
  1: "Natureza",
  2: "Museu",
  3: "Histórico",
  4: "Gastronomia"
};

export const PontoCard = ({ ponto, onAddEvento, onDeletePonto, onDeleteEvento, onEditPonto, onEditEvento }) => {
  const [showEventos, setShowEventos] = useState(false);

  return (
    <div className="card ponto-card mb-4 p-4">
      <div className="card-body p-0">
        
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3 className="fw-bold m-0">{ponto.nome}</h3>
          <div className="d-flex gap-2">
            <button
              className="btn-icon-edit"
              data-bs-toggle="modal"
              data-bs-target="#modalPonto"
              onClick={() => onEditPonto(ponto)}
              title="Editar Ponto Turístico"
            >
              <Edit2 size={18} />
            </button>
            <button
              className="btn-icon-delete"
              onClick={() => onDeletePonto(ponto.id)}
              title="Excluir Ponto Turístico"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

   
        <div className="d-flex flex-wrap gap-2 mb-3">
          {ponto.categorias?.map((cat, index) => {
            const nomeCategoria = typeof cat === 'number' ? CATEGORIAS_ENUM[cat] : (cat.nome || cat);
            return (
              <span key={index} className="badge-categoria">
                {nomeCategoria}
              </span>
            );
          })}
        </div>

        <p className="text-muted mb-4">{ponto.descricao}</p>

        <div className="d-flex flex-column gap-2 text-secondary small mb-4">
          <div className="d-flex align-items-center gap-2">
            <MapPin size={16} className="text-primary" /> {ponto.endereco}
          </div>
          <div className="d-flex align-items-center gap-2">
            <MapPin size={16} className="text-primary" /> {ponto.cidade} - {ponto.estado}
          </div>
          <div className="d-flex align-items-center gap-2">
            <Clock size={16} className="text-primary" />
            Abertura: {new Date(ponto.dataInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} /
            Fechamento: {new Date(ponto.dataFim).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div className="pt-3 border-top d-flex justify-content-between align-items-center">
          <button
            className="btn-add-action"
            data-bs-toggle="modal"
            data-bs-target="#modalEvento"
            onClick={() => onAddEvento(ponto)}
          >
            <Plus size={16} /> Adicionar Evento
          </button>

          <button
            className="btn-toggle-eventos"
            onClick={() => setShowEventos(!showEventos)}
          >
            Ver Eventos ({ponto.eventos?.length || 0})
            <ChevronDown 
              size={16} 
              style={{ 
                transform: showEventos ? 'rotate(180deg)' : 'none', 
                transition: '0.3s' 
              }} 
            />
          </button>
        </div>

        {showEventos && (
          <div className="eventos-container mt-4">
            {ponto.eventos?.map(evento => (
              <div key={evento.id} className="evento-item-card d-flex justify-content-between align-items-center">
                <div className="evento-content">
                  <div className="evento-title">{evento.nome}</div>
                  <div className="evento-info">
                    <Calendar size={14} /> 
                    {new Date(evento.dataInicio).toLocaleDateString()} - <Clock size={14} /> {new Date(evento.dataInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="evento-info">
                    <Calendar size={14} /> 
                    {new Date(evento.dataFim).toLocaleDateString()} - <Clock size={14} />  {new Date(evento.dataFim).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="evento-info">
                    <MapPin size={14} /> {evento.endereco}
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn-icon-edit-small"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEvento"
                    onClick={() => onEditEvento(evento)}
                    title="Editar Evento"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    className="btn-icon-delete-small"
                    onClick={() => onDeleteEvento(evento.id)}
                    title="Excluir Evento"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {ponto.eventos?.length === 0 && (
              <div className="text-center py-3">
                <small className="text-muted">Nenhum evento programado.</small>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};