import { useState } from "react";

export const useHome = () => {
    const [isPontoModalOpen, setIsPontoModalOpen] = useState(false);
    const [isEventoModalOpen, setIsEventoModalOpen] = useState(false);
    const [pontoSelecionado, setPontoSelecionado] = useState(null);

    const abrirModalEvento = (ponto) => {
        setPontoSelecionado(ponto);
        setIsEventoModalOpen(true);
    };

    return {
        isPontoModalOpen, setIsPontoModalOpen,
        isEventoModalOpen, setIsEventoModalOpen,
        pontoSelecionado, abrirModalEvento
    };

};