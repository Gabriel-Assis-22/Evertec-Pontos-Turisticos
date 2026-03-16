using Microsoft.EntityFrameworkCore;
using TouristSpot.API.Models; 

namespace TouristSpot.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<PontoTuristico> PontosTuristicos { get; set; }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PontoTuristico>().ToTable("PontoTuristicos");
            modelBuilder.Entity<Evento>().ToTable("Eventos");

            // Relação N:N Categorias
            modelBuilder.Entity<PontoTuristico>()
                .HasMany(p => p.Categorias)
                .WithMany(c => c.PontoTuristicos);

            // Relação 1:N EventosInternos
            modelBuilder.Entity<PontoTuristico>()
                .HasMany(p => p.EventosInternos)
                .WithOne(e => e.PontoTuristicoPai)
                .HasForeignKey(e => e.PontoTuristicoId);
        }
    }
}