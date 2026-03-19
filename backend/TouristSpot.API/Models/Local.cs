using System.ComponentModel.DataAnnotations; 

namespace TouristSpot.API.Models; 

// Classe abstrata base para garantir o comportamento polimórfico entre as subclasses.
public abstract class Local
{
    [Key]
    public virtual int Id {get; set; }

    [Required, MaxLength(100)]
    public string Nome {get; set; } = string.Empty; 

    [Required, MaxLength(100)]
    public string Descricao {get; set; } = string.Empty; 

    [Required]
    public string Endereco {get; set; } = string.Empty; 

    public DateTime DataInicio { get; set; }
    // Definição de abstração para implementação de polimorfismo. 
    public DateTime DataFim { get; set; }

    public abstract string GetLocalizacaoCompleta();  
    // Definição de abstração para implementação de polimorfismo.
    public abstract bool EstaAbertoOuAtivo();

}