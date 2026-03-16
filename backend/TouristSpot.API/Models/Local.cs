using System.ComponentModel.DataAnnotations; 

namespace TouristSpot.API.Models; 

public abstract class Local
{
    [Key]
    public virtual int Id {get; protected set; }

    [Required, MaxLength(100)]
    public string Nome {get; set; } = string.Empty; 

    [Required, MaxLength(100)]
    public string Descricao {get; set; } = string.Empty; 

    [Required]
    public string Endereco {get; set; } = string.Empty; 

    public DateTime DataInicio { get; set; }

    public DateTime DataFim { get; set; }

}