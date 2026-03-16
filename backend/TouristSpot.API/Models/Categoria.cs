using System.ComponentModel.DataAnnotations; 

namespace TouristSpot.API.Models;

public class Categoria
{   [Key]
    public int Id {set; get; }
    public string Nome {get; set; } = string.Empty;

    [Required, MaxLength(50)]
    public virtual ICollection<PontoTuristico> PontoTuristicos {get; set; } = new List<PontoTuristico>();
}
