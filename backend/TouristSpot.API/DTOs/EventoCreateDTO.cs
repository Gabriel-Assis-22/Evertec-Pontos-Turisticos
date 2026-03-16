namespace TouristSpot.API.DTOs;
public record EventoCreateDTO(
    string Nome,
    string Descricao,
    string Endereco,
    DateTime DataInicio,
    DateTime DataFim,
    int PontoTuristicoId
);