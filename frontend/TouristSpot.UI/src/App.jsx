import React, { useState, useEffect } from 'react'
import { Header } from './components/Header';
import { PontoCard } from './components/PontoCard';
import './App.css'
import { Modal } from './components/modals/Modal';
import { PontoForm } from './components/modals/PontoForm';
import { EventoForm } from './components/modals/EventoForm'; // Adicione este
import PontoTuristicoService from './services/pontoTuristicoService';
import EventoService from './services/eventoService';

function App() {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pontoAtivo, setPontoAtivo] = useState(null); // Estado para saber qual ponto receberá o evento
  const [pontoEmEdicao, setPontoEmEdicao] = useState(null);
  const [eventoEmEdicao, setEventoEmEdicao] = useState(null);

  useEffect(() => {
    carregarPontos();

    // Limpa os estados ao fechar os modais (via botão Cancelar ou clicando fora)
    const modalPonto = document.getElementById('modalPonto');
    const modalEvento = document.getElementById('modalEvento');

    const handlePontoHidden = () => setPontoEmEdicao(null);
    const handleEventoHidden = () => {
      setEventoEmEdicao(null);
      setPontoAtivo(null);
    };

    if (modalPonto) modalPonto.addEventListener('hidden.bs.modal', handlePontoHidden);
    if (modalEvento) modalEvento.addEventListener('hidden.bs.modal', handleEventoHidden);

    return () => {
      if (modalPonto) modalPonto.removeEventListener('hidden.bs.modal', handlePontoHidden);
      if (modalEvento) modalEvento.removeEventListener('hidden.bs.modal', handleEventoHidden);
    };
  }, []);

  const carregarPontos = async () => {
    try {
      setLoading(true);
      const data = await PontoTuristicoService.getAll();
      setPontos(data);
    } catch (err) {
      console.error("Erro ao conectar com API .NET", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (termo) => {
    try {
      if (termo.length > 2) {
        const resultados = await PontoTuristicoService.search(termo);
        setPontos(resultados);
      } else if (termo.length === 0) {
        carregarPontos();
      }
    } catch (err) {
      console.error("Erro na busca", err);
    }
  };

  const handleDeletePonto = async (id) => {
    if (window.confirm("Deseja realmente excluir este ponto turístico?")) {
      try {
        await PontoTuristicoService.delete(id);
        carregarPontos(); // Atualiza a lista
      } catch (err) {
        console.error("Erro ao excluir ponto turístico", err);
      }
    }
  };

  const handleDeleteEvento = async (id) => {
    if (window.confirm("Deseja excluir este evento?")) {
      try {
        await EventoService.delete(id);
        carregarPontos(); // Atualiza para sumir o evento do card
      } catch (err) {
        console.error("Erro ao excluir evento", err);
      }
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* 1. Passamos o handleSearch para o Header */}
      <Header
        onSearch={handleSearch}
        onNovoPontoClick={() => setPontoEmEdicao(null)}
      />

      <main className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {loading ? (
              <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
              </div>
            ) : pontos.length === 0 ? (
              <div className="text-center mt-5 text-muted">
                <p>Nenhum ponto turístico encontrado.</p>
              </div>
            ) : (
              pontos.map(ponto => (
                <PontoCard
                  key={ponto.id}
                  ponto={ponto}
                  onAddEvento={(p) => {
                    setPontoAtivo(p);
                    setEventoEmEdicao(null);
                  }}
                  onDeletePonto={handleDeletePonto}
                  onDeleteEvento={handleDeleteEvento}
                  onEditPonto={(p) => setPontoEmEdicao(p)}
                  onEditEvento={(e) => setEventoEmEdicao(e)}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* MODAL PONTO (Criar/Editar) */}
      <Modal id="modalPonto" title={pontoEmEdicao?.id ? "Editar Ponto Turístico" : "Cadastrar Ponto Turístico"}>
        <PontoForm
          initialData={pontoEmEdicao}
          onSave={() => {
            carregarPontos();
            setPontoEmEdicao(null);
          }}
        />
      </Modal>

      {/* MODAL EVENTO (Criar/Editar) */}
      <Modal id="modalEvento" title={eventoEmEdicao?.id ? "Editar Evento" : `Novo Evento em ${pontoAtivo?.nome}`}>
        <EventoForm
          pontoId={pontoAtivo?.id}
          initialData={eventoEmEdicao}
          onSave={() => {
            carregarPontos();
            setPontoAtivo(null);
            setEventoEmEdicao(null);
          }}
        />
      </Modal>
    </div>
  );
}

export default App;