import React from "react";

export const PontoForm = ({ isEditMode }) => {
  const categoriasDisponiveis = [
    { id: 1, nome: "Natureza" },
    { id: 2, nome: "Museu" },
    { id: 3, nome: "Histórico" },
    { id: 4, nome: "Gastronomia" }
  ];

  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label className="form-label small fw-bold">Nome *</label>
        <input
          className="form-control form-control-custom"
          placeholder="Nome do ponto turístico"
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Estado *</label>
        <input
          className="form-control form-control-custom"
          placeholder="UF"
          readOnly
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-bold">CEP *</label>
        <input
          className="form-control form-control-custom"
          placeholder="00000000"
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Cidade *</label>
        <input
          className="form-control form-control-custom"
          placeholder="Cidade"
          readOnly
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-bold">Endereço *</label>
        <input
          className="form-control form-control-custom"
          placeholder="Rua, número, bairro"
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Descrição *</label>
        <textarea
          className="form-control form-control-custom"
          rows="1"
          placeholder="Descreva o ponto turístico"
          required
        ></textarea>
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-bold">Horário de Abertura *</label>
        <input
          type="time"
          className="form-control form-control-custom"
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Horário de Fechamento *</label>
        <input
          type="time"
          className="form-control form-control-custom"
          required
        />
      </div>

      <div className="col-12 mt-2">
        <label className="form-label small fw-bold mb-2">Categorias</label>
        <div className="d-flex flex-wrap gap-4">
          {categoriasDisponiveis.map(cat => (
            <div key={cat.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`categoria-${cat.id}`}
                style={{ cursor: 'pointer' }}
              />
              <label 
                className="form-check-label" 
                htmlFor={`categoria-${cat.id}`} 
                style={{ cursor: 'pointer' }}
              >
                {cat.nome}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 mt-4">
        <button type="button" className="btn btn-primary-custom w-100 py-3">
          {isEditMode ? "Atualizar Ponto Turístico" : "Salvar Ponto Turístico"}
        </button>
      </div>
    </form>
  );
};