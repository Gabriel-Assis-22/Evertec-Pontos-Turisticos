using Microsoft.AspNetCore.Mvc;
using TouristSpot.API.Services.Interfaces;
using TouristSpot.API.DTOs;

namespace TouristSpot.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PontoTuristicoController : ControllerBase
{
    private readonly ITouristSpotService _service;

    public PontoTuristicoController(ITouristSpotService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PontoTuristicoResponseDTO>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PontoTuristicoResponseDTO>> GetById(int id)
    {
        var ponto = await _service.GetByIdAsync(id);
        if (ponto == null) return NotFound(new { message = "Ponto turístico não encontrado." });
        return Ok(ponto);
    }

    [HttpPost]
    public async Task<ActionResult<PontoTuristicoResponseDTO>> Create(PontoTuristicoCreateDTO dto)
    {
        var novoPonto = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = novoPonto.Id }, novoPonto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, PontoTuristicoCreateDTO dto)
    {
        var sucesso = await _service.UpdateAsync(id, dto);
        if (!sucesso) return NotFound(new { message = "Ponto turístico não encontrado." });
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var sucesso = await _service.DeleteAsync(id);
        if (!sucesso) return NotFound(new { message = "Ponto turístico não encontrado." });
        return NoContent();
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<PontoTuristicoResponseDTO>>> Search([FromQuery] string q)
    {
        var resultados = await _service.SearchAsync(q ?? string.Empty);
        return Ok(resultados);
    }
}