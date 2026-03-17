import React from 'react';
import { Search, Plus } from 'lucide-react';

export const Header = () => {
  return (
    <nav className="navbar navbar-light bg-white border-bottom sticky-top py-3">
      <div className="container d-flex align-items-center justify-content-between">
        
        <div className="d-flex align-items-center gap-2">
          <div className="bg-primary p-2 rounded-3 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
          </div>
          <span className="fs-4 fw-bold text-dark">TurismoApp</span>
        </div>

        <div className="flex-grow-1 mx-5 position-relative d-none d-md-block">
          <Search 
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" 
            size={18} 
          />
          <input 
            type="text" 
            className="form-control form-control-custom ps-5 w-100" 
            placeholder="Buscar pontos turísticos..." 
          />
        </div>

        <button 
          className="btn btn-primary-custom d-flex align-items-center gap-2"
          data-bs-toggle="modal" 
          data-bs-target="#modalPonto"
        >
          <Plus size={18} /> Novo Ponto Turístico
        </button>

      </div>
    </nav>
  );
};