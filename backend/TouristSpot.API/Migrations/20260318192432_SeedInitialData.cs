using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TouristSpot.API.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PontoTuristicos",
                columns: new[] { "Id", "Categorias", "Cep", "Cidade", "DataFim", "DataInicio", "Descricao", "Endereco", "Estado", "Nome" },
                values: new object[,]
                {
                    { 1, "3,1", "22241330", "Rio de Janeiro", new DateTime(2024, 1, 1, 19, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 1, 1, 8, 0, 0, 0, DateTimeKind.Unspecified), "Uma das sete maravilhas do mundo moderno.", "Parque Nacional da Tijuca", "RJ", "Cristo Redentor" },
                    { 2, "4", "01024010", "São Paulo", new DateTime(2024, 1, 1, 18, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 1, 1, 6, 0, 0, 0, DateTimeKind.Unspecified), "Ícone da gastronomia paulistana.", "Rua Cantareira, 306", "SP", "Mercado Municipal de SP" }
                });

            migrationBuilder.InsertData(
                table: "Eventos",
                columns: new[] { "Id", "DataFim", "DataInicio", "Descricao", "Endereco", "Nome", "PontoTuristicoId" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 7, 15, 22, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2026, 7, 15, 18, 0, 0, 0, DateTimeKind.Unspecified), "Show de música ao vivo com vista panorâmica.", "Mirante Secundário", "Festival de Inverno no Morro", 1 },
                    { 2, new DateTime(2026, 8, 20, 19, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2026, 8, 20, 17, 0, 0, 0, DateTimeKind.Unspecified), "Apresentação de violino durante o crepúsculo.", "Plataforma Principal", "Pôr do Sol Musical", 1 },
                    { 3, new DateTime(2026, 5, 10, 17, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2026, 5, 10, 9, 0, 0, 0, DateTimeKind.Unspecified), "Degustação gratuita de frutas raras de todo o Brasil.", "Ala Central", "Semana das Frutas Exóticas", 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Eventos",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Eventos",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Eventos",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "PontoTuristicos",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PontoTuristicos",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
