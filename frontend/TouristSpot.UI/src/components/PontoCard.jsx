import React, { useState } from 'react';
import { MapPin, Clock, ChevronDown, Calendar, Trash2, Plus, Edit2 } from 'lucide-react';

export const PontoCard = ({ ponto }) => {
  const [showEventos, setShowEventos] = useState(false);

  if (!ponto) return null;

  return (
    <div className="card ponto-card mb-4 p-4">
      <div className="card-body p-0">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3 className="fw-bold m-0">{ponto.nome || "Nome do Local"}</h3>
          <div className="d-flex gap-2">
            <button className="btn-icon-edit" data-bs-toggle="modal" data-bs-target="#modalPonto">
              <Edit2 size={18} />
            </button>
            <button className="btn-icon-delete">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {ponto.categorias?.map((cat, index) => (
            <span key={index} className="badge-categoria">{cat.nome || cat}</span>
          ))}
        </div>

        <p className="text-muted mb-4">{ponto.descricao || "Sem descrição disponível."}</p>

        <div className="d-flex flex-column gap-2 text-secondary small mb-4">
          <div className="d-flex align-items-center gap-2">
            <MapPin size={16} className="text-primary" /> {ponto.endereco || "Endereço não informado"}
          </div>
          <div className="d-flex align-items-center gap-2">
            <MapPin size={16} className="text-primary" /> {ponto.cidade} - {ponto.estado}
          </div>
          <div className="d-flex align-items-center gap-2">
            <Clock size={16} className="text-primary" />
            Horário: {ponto.dataInicio} às {ponto.dataFim}
          </div>
        </div>

        <div className="pt-3 border-top d-flex justify-content-between align-items-center">
          <button className="btn-add-action" data-bs-toggle="modal" data-bs-target="#modalEvento">
            <Plus size={16} /> Adicionar Evento
          </button>

          <button className="btn-toggle-eventos" onClick={() => setShowEventos(!showEventos)}>
            Ver Eventos ({ponto.eventos?.length || 0})
            <ChevronDown size={16} style={{ transform: showEventos ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
          </button>
        </div>

        {showEventos && (
          <div className="eventos-container mt-4">
            {ponto.eventos?.map((evento, index) => (
              <div key={index} className="evento-item-card d-flex justify-content-between align-items-center">
                <div className="evento-content">
                  <div className="evento-title">{evento.nome}</div>
                  <div className="evento-info">
                    <Calendar size={14} /> {evento.dataInicio} às {evento.dataFim}
                  </div>
                  <div className="evento-info">
                    <MapPin size={14} /> {evento.endereco}
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn-icon-edit-small" data-bs-toggle="modal" data-bs-target="#modalEvento">
                    <Edit2 size={14} />
                  </button>
                  <button className="btn-icon-delete-small">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {(!ponto.eventos || ponto.eventos.length === 0) && (
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