using Microsoft.EntityFrameworkCore;
using TouristSpot.API.Data;
using TouristSpot.API.DTOs;
using TouristSpot.API.Models;
using TouristSpot.API.Services.Interfaces;

namespace TouristSpot.API.Services;

public class EventoSpotService : IEventoSpotService
{
    private readonly AppDbContext _context;

    public EventoSpotService(AppDbContext context) => _context = context;

    public async Task<IEnumerable<EventoResponseDTO>> GetAllAsync()
    {
        var eventos = await _context.Eventos
            .Include(e => e.PontoTuristicoPai) 
            .ToListAsync();

        return eventos.Select(e => MapToResponseDTO(e));
    }

    public async Task<EventoResponseDTO?> GetByIdAsync(int id)
    {
        var evento = await _context.Eventos
            .Include(e => e.PontoTuristicoPai)
            .FirstOrDefaultAsync(e => e.Id == id);

        return evento == null ? null : MapToResponseDTO(evento);
    }

    public async Task<EventoResponseDTO> CreateAsync(EventoCreateDTO dto)
    {
        var novoEvento = new Evento
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Endereco = dto.Endereco,
            DataInicio = dto.DataInicio,
            DataFim = dto.DataFim,
            PontoTuristicoId = dto.PontoTuristicoId
        };

        _context.Eventos.Add(novoEvento);
        await _context.SaveChangesAsync();

        
        var eventoSalvo = await _context.Eventos
            .Include(e => e.PontoTuristicoPai)
            .FirstAsync(e => e.Id == novoEvento.Id);

        return MapToResponseDTO(eventoSalvo);
    }

    public async Task<bool> UpdateAsync(int id, EventoCreateDTO dto)
    {
        var eventoExistente = await _context.Eventos.FindAsync(id);
        if (eventoExistente == null) return false;

        eventoExistente.Nome = dto.Nome;
        eventoExistente.Descricao = dto.Descricao;
        eventoExistente.Endereco = dto.Endereco;
        eventoExistente.DataInicio = dto.DataInicio;
        eventoExistente.DataFim = dto.DataFim;
        eventoExistente.PontoTuristicoId = dto.PontoTuristicoId;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var evento = await _context.Eventos.FindAsync(id);
        if (evento == null) return false;

        _context.Eventos.Remove(evento);
        await _context.SaveChangesAsync();
        return true;
    }

    private static EventoResponseDTO MapToResponseDTO(Evento e)
    {
        return new EventoResponseDTO(
            e.Id,
            e.Nome,
            e.Descricao,
            e.Endereco,
            e.DataInicio,
            e.DataFim,
            e.PontoTuristicoId,
            e.PontoTuristicoPai?.Nome ?? "Ponto não encontrado"
        );
    }
}