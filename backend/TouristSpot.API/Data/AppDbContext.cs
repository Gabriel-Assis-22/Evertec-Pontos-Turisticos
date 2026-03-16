using Microsoft.EntityFrameworkCore;
using TouristSpot.API.Enums;
using TouristSpot.API.Models; 

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
        }
    }
}