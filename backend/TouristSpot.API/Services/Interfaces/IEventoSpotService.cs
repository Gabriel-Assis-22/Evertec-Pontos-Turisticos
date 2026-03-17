using TouristSpot.API.DTOs;

namespace TouristSpot.API.Services.Interfaces;

public interface IEventoSpotService
{
    Task<IEnumerable<EventoResponseDTO>> GetAllAsync();
    Task<EventoResponseDTO?> GetByIdAsync(int id); 
    Task<EventoResponseDTO> CreateAsync(EventoCreateDTO dto);
    Task<bool> UpdateAsync(int id, EventoCreateDTO dto);
    Task<bool> DeleteAsync(int id); 

}
