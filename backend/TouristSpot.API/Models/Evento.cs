using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristSpot.API.Models;

public class Evento: Local {
    public override int Id {get; set; }

    [Required]
    public int PontoTuristicoId {get; set; }
    
    [ForeignKey("PontoTuristicoId")]
    public virtual PontoTuristico PontoTuristicoPai {get; set; } = null!; 
    //Este trecho não está sendo utilizado
    public override string GetLocalizacaoCompleta() => $"Loca: {PontoTuristicoPai.Nome} - Referêcia interna: {Endereco}";
    //Este trecho não está sendo utilizado
    public override bool EstaAbertoOuAtivo(){
        return DateTime.UtcNow >= DataInicio && DateTime.UtcNow <= DataFim; 
    }

}