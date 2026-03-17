using TouristSpot.API.DTOs;

namespace TouristSpot.API.Services.Interfaces;

public interface ITouristSpotService
{
    Task<IEnumerable<PontoTuristicoResponseDTO>> GetAllAsync();
    Task<PontoTuristicoResponseDTO?> GetByIdAsync(int id);
    Task<PontoTuristicoResponseDTO> CreateAsync(PontoTuristicoCreateDTO dto);
    Task<bool> UpdateAsync(int id, PontoTuristicoCreateDTO dto);
    Task<bool> DeleteAsync(int id);
    Task<IEnumerable<PontoTuristicoResponseDTO>> SearchAsync(string term);
}