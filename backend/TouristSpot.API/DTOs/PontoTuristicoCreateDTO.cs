namespace TouristSpot.API.DTOs;
public record PontoTuristicoCreateDTO(
    string Nome,
    string Descricao,
    string Cep,
    string Endereco,
    string Cidade,
    string Estado,
    DateTime DataInicio,
    DateTime DataFim,
    List<int> CategoriaIds
);