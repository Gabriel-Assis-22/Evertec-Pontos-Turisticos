using Microsoft.EntityFrameworkCore;
using TouristSpot.API.Data;
using TouristSpot.API.Models;
using TouristSpot.API.Services.Interfaces;
using TouristSpot.API.DTOs;

namespace TouristSpot.API.Services;

public class TouristSpotService : ITouristSpotService
{
    private readonly AppDbContext _context;

    public TouristSpotService(AppDbContext context) => _context = context;

    public async Task<IEnumerable<PontoTuristicoResponseDTO>> GetAllAsync()
    {
        var pontos = await _context.PontosTuristicos
            .Include(p => p.EventosInternos)
            .ToListAsync();

        return pontos.Select(p => MapToResponseDTO(p));
    }

    public async Task<PontoTuristicoResponseDTO?> GetByIdAsync(int id)
    {
        var ponto = await _context.PontosTuristicos
            .Include(p => p.EventosInternos)
            .FirstOrDefaultAsync(p => p.Id == id);

        return ponto == null ? null : MapToResponseDTO(ponto);
    }

    public async Task<PontoTuristicoResponseDTO> CreateAsync(PontoTuristicoCreateDTO dto)
    {
        var novoPonto = new PontoTuristico
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Cep = dto.Cep,
            Endereco = dto.Endereco,
            Cidade = dto.Cidade,
            Estado = dto.Estado,
            DataInicio = dto.DataInicio,
            DataFim = dto.DataFim,
            Categorias = dto.CategoriaIds 
        };

        _context.PontosTuristicos.Add(novoPonto);
        await _context.SaveChangesAsync();

        return MapToResponseDTO(novoPonto);
    }

    public async Task<bool> UpdateAsync(int id, PontoTuristicoCreateDTO dto)
    {
        var pontoExistente = await _context.PontosTuristicos.FindAsync(id);

        if (pontoExistente == null) return false;

        pontoExistente.Nome = dto.Nome;
        pontoExistente.Descricao = dto.Descricao;
        pontoExistente.Cep = dto.Cep;
        pontoExistente.Endereco = dto.Endereco;
        pontoExistente.Cidade = dto.Cidade;
        pontoExistente.Estado = dto.Estado;
        pontoExistente.DataInicio = dto.DataInicio;
        pontoExistente.DataFim = dto.DataFim;
        pontoExistente.Categorias = dto.CategoriaIds; 

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<PontoTuristicoResponseDTO>> SearchAsync(string term)
    {
        var termLower = term.ToLower();
        var resultados = await _context.PontosTuristicos
            .Where(p => p.Nome.ToLower().Contains(termLower) ||
                        p.Descricao.ToLower().Contains(termLower) ||
                        p.Cidade.ToLower().Contains(termLower))
            .Include(p => p.EventosInternos)
            .ToListAsync();

        return resultados.Select(p => MapToResponseDTO(p));
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var ponto = await _context.PontosTuristicos.FindAsync(id);
        if (ponto == null) return false;

        _context.PontosTuristicos.Remove(ponto);
        await _context.SaveChangesAsync();
        return true;
    }

    private static PontoTuristicoResponseDTO MapToResponseDTO(PontoTuristico p)
    {
        return new PontoTuristicoResponseDTO(
            p.Id,
            p.Nome,
            p.Descricao,
            p.Cep,
            p.Endereco,
            p.Cidade,
            p.Estado,
            p.DataInicio,
            p.DataFim,
            p.Categorias.Select(c => c.ToString()).ToList(), 
            p.EventosInternos.Select(e => new EventoResponseDTO(
                e.Id,
                e.Nome,
                e.Descricao,
                e.Endereco,
                e.DataInicio,
                e.DataFim,
                p.Id,
                p.Nome
            )).ToList()
        );
    }
}