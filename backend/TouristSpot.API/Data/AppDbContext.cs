using Microsoft.EntityFrameworkCore;
using TouristSpot.API.Enums;
using TouristSpot.API.Models; 
using System; 
using System.Linq; 
using System.Collections.Generic; 

namespace TouristSpot.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<PontoTuristico> PontosTuristicos { get; set; }
        public DbSet<Evento> Eventos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PontoTuristico>().ToTable("PontoTuristicos");
            modelBuilder.Entity<Evento>().ToTable("Eventos");

            // Relação 1:N EventosInternos
            modelBuilder.Entity<PontoTuristico>()
                .HasMany(p => p.EventosInternos)
                .WithOne(e => e.PontoTuristicoPai)
                .HasForeignKey(e => e.PontoTuristicoId);
            
            //Configuração para conversão do Enum
            modelBuilder.Entity<PontoTuristico>()
                .Property(p => p.Categorias)
                .HasConversion(
                    v => string.Join(',', v.Select(e => (int)e)), 
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                          .Select(s => (TipoCategoria)int.Parse(s)).ToList() 
                );

                // 1. Inserindo Pontos Turísticos
            modelBuilder.Entity<PontoTuristico>().HasData(
                new PontoTuristico
                {
                    Id = 1,
                    Nome = "Cristo Redentor",
                    Descricao = "Uma das sete maravilhas do mundo moderno.",
                    Cep = "22241330",
                    Endereco = "Parque Nacional da Tijuca",
                    Cidade = "Rio de Janeiro",
                    Estado = "RJ",
                    DataInicio = new DateTime(2024, 01, 01, 08, 0, 0),
                    DataFim = new DateTime(2024, 01, 01, 19, 0, 0),
                    Categorias = new List<TipoCategoria> { TipoCategoria.Historico, TipoCategoria.Natureza }
                },
                new PontoTuristico
                {
                    Id = 2,
                    Nome = "Mercado Municipal de SP",
                    Descricao = "Ícone da gastronomia paulistana.",
                    Cep = "01024010",
                    Endereco = "Rua Cantareira, 306",
                    Cidade = "São Paulo",
                    Estado = "SP",
                    DataInicio = new DateTime(2024, 01, 01, 06, 0, 0),
                    DataFim = new DateTime(2024, 01, 01, 18, 0, 0),
                    Categorias = new List<TipoCategoria> { TipoCategoria.Gastronomia }
                }
            );

            // 2. Inserindo Eventos
            modelBuilder.Entity<Evento>().HasData(
                // Eventos para o Ponto 1 (Cristo Redentor)
                new Evento
                {
                    Id = 1,
                    Nome = "Festival de Inverno no Morro",
                    Descricao = "Show de música ao vivo com vista panorâmica.",
                    Endereco = "Mirante Secundário",
                    DataInicio = new DateTime(2026, 07, 15, 18, 0, 0),
                    DataFim = new DateTime(2026, 07, 15, 22, 0, 0),
                    PontoTuristicoId = 1
                },
                new Evento
                {
                    Id = 2,
                    Nome = "Pôr do Sol Musical",
                    Descricao = "Apresentação de violino durante o crepúsculo.",
                    Endereco = "Plataforma Principal",
                    DataInicio = new DateTime(2026, 08, 20, 17, 0, 0),
                    DataFim = new DateTime(2026, 08, 20, 19, 0, 0),
                    PontoTuristicoId = 1
                },
                // Evento para o Ponto 2 (Mercadão)
                new Evento
                {
                    Id = 3,
                    Nome = "Semana das Frutas Exóticas",
                    Descricao = "Degustação gratuita de frutas raras de todo o Brasil.",
                    Endereco = "Ala Central",
                    DataInicio = new DateTime(2026, 05, 10, 09, 0, 0),
                    DataFim = new DateTime(2026, 05, 10, 17, 0, 0),
                    PontoTuristicoId = 2
                }
            );
        }
    }
}