using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TouristSpot.API.Migrations
{
    /// <inheritdoc />
    public partial class TransformCategoriasToEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoriaPontoTuristico");

            migrationBuilder.DropTable(
                name: "Categorias");

            migrationBuilder.AddColumn<string>(
                name: "Categorias",
                table: "PontoTuristicos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Categorias",
                table: "PontoTuristicos");

            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategoriaPontoTuristico",
                columns: table => new
                {
                    CategoriasId = table.Column<int>(type: "int", nullable: false),
                    PontoTuristicosId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriaPontoTuristico", x => new { x.CategoriasId, x.PontoTuristicosId });
                    table.ForeignKey(
                        name: "FK_CategoriaPontoTuristico_Categorias_CategoriasId",
                        column: x => x.CategoriasId,
                        principalTable: "Categorias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoriaPontoTuristico_PontoTuristicos_PontoTuristicosId",
                        column: x => x.PontoTuristicosId,
                        principalTable: "PontoTuristicos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoriaPontoTuristico_PontoTuristicosId",
                table: "CategoriaPontoTuristico",
                column: "PontoTuristicosId");
        }
    }
}
