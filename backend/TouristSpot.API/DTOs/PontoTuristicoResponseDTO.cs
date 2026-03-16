namespace TouristSpot.API.DTOs;

public record PontoTuristicoResponseDTO(
    int Id,
    string Nome,
    string Descricao,
    string Cep,
    string Endereco,
    string Cidade,
    string Estado,
    DateTime DataInicio,
    DateTime DataFim,
    List<string> Categorias,
    List<EventoResponseDTO> Eventos
);

