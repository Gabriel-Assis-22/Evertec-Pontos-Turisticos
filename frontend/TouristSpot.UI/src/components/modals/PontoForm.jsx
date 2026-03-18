import React, { useState, useEffect } from "react";
import { useCep } from "../../hooks/useCep";
import PontoTuristicoService from "../../services/pontoTuristicoService";

export const PontoForm = ({ initialData, onSave }) => {
  const { buscarEndereco, loadingCep } = useCep();
  
  const categoriasDisponiveis = [
    { id: 1, nome: "Natureza" },
    { id: 2, nome: "Museu" },
    { id: 3, nome: "Histórico" },
    { id: 4, nome: "Gastronomia" }
  ];

  const [formData, setFormData] = useState({
    nome: "",
    cep: "",
    endereco: "",
    cidade: "",
    estado: "",
    descricao: "",
    dataInicio: "", 
    dataFim: "",    
    categoriaIds: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dataInicio: initialData.dataInicio ? initialData.dataInicio.split('T')[1].substring(0, 5) : "",
        dataFim: initialData.dataFim ? initialData.dataFim.split('T')[1].substring(0, 5) : "",
        categoriaIds: initialData.categorias
          ? initialData.categorias
            .map(cat => typeof cat === 'number' ? cat : categoriasDisponiveis.find(c => c.nome === cat)?.id)
            .filter(id => id != null)
          : []
      });
    } else {
      setFormData({
        nome: "", cep: "", endereco: "", cidade: "", estado: "",
        descricao: "", dataInicio: "", dataFim: "", categoriaIds: []
      });
    }
  }, [initialData]);

  const handleCepBlur = async () => {
    const info = await buscarEndereco(formData.cep);
    if (info) {
      setFormData((prev) => ({
        ...prev,
        endereco: info.logradouro,
        cidade: info.localidade,
        estado: info.uf,
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      const payload = {
        ...formData,
        dataInicio: `2024-01-01T${formData.dataInicio}:00`,
        categoriaIds: formData.categoriaIds.filter(id => id !== null),
        dataFim: `2024-01-01T${formData.dataFim}:00`
      };

      if (initialData?.id) {
        await PontoTuristicoService.update(initialData.id, payload);
        alert("Ponto turístico atualizado com sucesso!");
      } else {
        await PontoTuristicoService.create(payload);
        alert("Ponto turístico salvo com sucesso!");
        
        setFormData({
          nome: "", cep: "", endereco: "", cidade: "", estado: "",
          descricao: "", dataInicio: "", dataFim: "", categoriaIds: []
        });
      }

      onSave();
      

      const modalElement = document.getElementById('modalPonto');
      const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();

    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar ponto turístico.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label small fw-bold">Nome *</label>
        <input
          className="form-control form-control-custom"
          placeholder="Nome do ponto turístico"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Estado *</label>
        <input
          className="form-control form-control-custom"
          placeholder="UF"
          value={formData.estado}
          readOnly
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-bold">CEP *</label>
        <input
          className="form-control form-control-custom"
          placeholder="00000000"
          value={formData.cep}
          onBlur={handleCepBlur}
          onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
          required
        />
        {loadingCep && <small className="text-primary">Buscando CEP...</small>}
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Cidade *</label>
        <input
          className="form-control form-control-custom"
          value={formData.cidade}
          readOnly
        />
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-bold">Endereço *</label>
        <input
          className="form-control form-control-custom"
          placeholder="Rua, número, bairro"
          value={formData.endereco}
          onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Descrição *</label>
        <textarea
          className="form-control form-control-custom"
          rows="1"
          placeholder="Descreva o ponto turístico"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          required
        ></textarea>
      </div>

      <div className="col-md-6">
        <label className="form-label small fw-bold">Horário de Abertura *</label>
        <input
          type="time"
          className="form-control form-control-custom"
          value={formData.dataInicio}
          onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small fw-bold">Horário de Fechamento *</label>
        <input
          type="time"
          className="form-control form-control-custom"
          value={formData.dataFim}
          onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
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
                checked={formData.categoriaIds.includes(cat.id)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setFormData(prev => ({
                    ...prev,
                    categoriaIds: isChecked
                      ? [...prev.categoriaIds, cat.id]
                      : prev.categoriaIds.filter(id => id !== cat.id)
                  }));
                }}
              />
              <label className="form-check-label" htmlFor={`categoria-${cat.id}`} style={{ cursor: 'pointer' }}>
                {cat.nome}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 mt-4">
        <button type="submit" className="btn btn-primary-custom w-100 py-3">
          {initialData?.id ? "Atualizar Ponto Turístico" : "Salvar Ponto Turístico"}
        </button>
      </div>
    </form>
  );
};