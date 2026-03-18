using TouristSpot.API.Enums;
namespace TouristSpot.API.Models;

public class PontoTuristico: Local
{
    public override int Id {get; set;}
    public string Cep { get; set; } = string.Empty;
    public string Cidade {get; set; } = string.Empty;
    public string Estado {get; set; } = string.Empty;

    public virtual ICollection<Evento> EventosInternos { get; set; } = new List<Evento>();

    public virtual ICollection<TipoCategoria> Categorias { get; set; } = new List<TipoCategoria>();
    public override string GetLocalizacaoCompleta() => $"{Endereco}, {Cidade} - {Estado}"; 

    public override bool EstaAbertoOuAtivo(){
        var agora = DateTime.Now.TimeOfDay;
        return agora >= DataInicio.TimeOfDay && agora <= DataFim.TimeOfDay; 
    }


}