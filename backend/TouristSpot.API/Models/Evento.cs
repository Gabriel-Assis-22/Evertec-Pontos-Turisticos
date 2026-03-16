using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristSpot.API.Models;

public class Evento: Local {
    public override int Id {get; protected set; }

    [Required]
    public int PontoTuristicoId {get; set; }
    
    [ForeignKey("PontoTuristicoId")]
    public virtual PontoTuristico PontoTuristicoPai {get; set; } = null!; 

}