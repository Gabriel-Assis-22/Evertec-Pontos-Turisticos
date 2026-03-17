import React from 'react';
import { Header } from './components/Header';
import { PontoCard } from './components/PontoCard';
import { PontoForm } from './components/modals/PontoForm';
import { EventoForm } from './components/modals/EventoForm';
import './App.css';

// Dados de exemplo para você ver o layout funcionando sem o Banco de Dados
const pontosFake = [
  {
    id: 1,
    nome: "Cristo Redentor",
    descricao: "Uma das sete maravilhas do mundo moderno, localizado no topo do morro do Corcovado.",
    endereco: "Parque Nacional da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    dataInicio: "08:00",
    dataFim: "19:00",
    categorias: ["Histórico", "Natureza"],
    eventos: [
      { id: 101, nome: "Pôr do Sol Musical", dataInicio: "20/05/2026 17:00", dataFim: "20/05/2026 19:00", endereco: "Mirante do Cristo" }
    ]
  },
  {
    id: 2,
    nome: "Museu do Amanhã",
    descricao: "Um museu de ciências aplicadas que explora as oportunidades e os desafios que a humanidade terá de enfrentar.",
    endereco: "Praça Mauá, 1",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    dataInicio: "10:00",
    dataFim: "18:00",
    categorias: ["Museu", "Gastronomia"],
    eventos: []
  }
];

function App() {
  return (
    <div className="min-vh-100 bg-light">
      {/* Header Visual */}
      <Header />

      <main className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Mapeamento dos dados fake para os Cards */}
            {pontosFake.map(ponto => (
              <PontoCard key={ponto.id} ponto={ponto} />
            ))}
          </div>
        </div>
      </main>

      {/* Estrutura dos Modais (Bootstrap puro) */}
      
      {/* Modal Ponto Turístico */}
      <div className="modal fade" id="modalPonto" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-4">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Cadastrar Ponto Turístico</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <PontoForm />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Evento */}
      <div className="modal fade" id="modalEvento" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content p-4">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Novo Evento</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <EventoForm />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;