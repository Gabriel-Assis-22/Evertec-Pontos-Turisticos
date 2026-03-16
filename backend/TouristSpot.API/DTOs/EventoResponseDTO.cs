namespace TouristSpot.API.DTOs;
public record EventoResponseDTO(
    int Id,
    string Nome,
    string Descricao,
    string Endereco,
    DateTime DataInicio,
    DateTime DataFim,
    int PontoTuristicoId,
    string NomePontoTuristico
);