# Estágio de Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["TouristSpot.API.csproj", "./"]
RUN dotnet restore "TouristSpot.API.csproj"

COPY . .
RUN dotnet build "TouristSpot.API.csproj" -c Release -o /app/build

# Estágio de Publicação
FROM build AS publish
RUN dotnet publish "TouristSpot.API.csproj" -c Release -o /app/publish

# Estágio Final (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=publish /app/publish .

# --- ADIÇÕES AQUI ---
# 1. Informa ao Docker que esta porta será usada
EXPOSE 8080

# 2. Garante que o .NET use a porta 8080 internamente
ENV ASPNETCORE_URLS=http://+:8080
# --------------------

ENTRYPOINT ["dotnet", "TouristSpot.API.dll"]