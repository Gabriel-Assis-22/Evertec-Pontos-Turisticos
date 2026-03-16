namespace TouristSpot.API.Models;

public class PontoTuristico: Local
{
    public override int Id {get; protected set;}
    public string Cep { get; set; } = string.Empty;
    public string Cidade {get; set; } = string.Empty;
    public string Estado {get; set; } = string.Empty;

    public virtual ICollection<Evento> EventosInternos { get; set; } = new List<Evento>();

    public virtual ICollection<Categoria> Categorias { get; set; } = new List<Categoria>(); 

}