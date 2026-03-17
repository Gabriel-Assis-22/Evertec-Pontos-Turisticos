using Microsoft.AspNetCore.Mvc;
using TouristSpot.API.Services.Interfaces;
using TouristSpot.API.DTOs;

namespace TouristSpot.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventosController : ControllerBase
{
    private readonly IEventoSpotService _service;

    public EventosController(IEventoSpotService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EventoResponseDTO>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EventoResponseDTO>> GetById(int id)
    {
        var evento = await _service.GetByIdAsync(id);
        if (evento == null) return NotFound(new { message = "Evento não encontrado." });
        return Ok(evento);
    }

    [HttpPost]
    public async Task<ActionResult<EventoResponseDTO>> Create(EventoCreateDTO dto)
    {
        var novoEvento = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = novoEvento.Id }, novoEvento);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, EventoCreateDTO dto)
    {
        var sucesso = await _service.UpdateAsync(id, dto);
        if (!sucesso) return NotFound(new { message = "Evento não encontrado." });
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var sucesso = await _service.DeleteAsync(id);
        if (!sucesso) return NotFound(new { message = "Evento não encontrado." });
        return NoContent();
    }
}