# Evertec-Pontos-Turisticos
```mermaid
erDiagram
    Categorias ||--o{ CategoriaPontoTuristico : "possui"
    PontoTuristicos ||--o{ CategoriaPontoTuristico : "pertence a"
    PontoTuristicos ||--o{ Eventos : "sedia"

    Categorias {
        int Id PK
        string Nome
    }

    PontoTuristicos {
        int Id PK
        string Nome
        string Descricao
        string Cidade
        string Estado
        string Endereco
        string Cep
        datetime2 DataInicio
        datetime2 DataFim
    }

    CategoriaPontoTuristico {
        int CategoriasId PK, FK
        int PontoTuristicosId PK, FK
    }

    Eventos {
        int Id PK
        int PontoTuristicoId FK
        string Nome
        string Descricao
        string Endereco
        datetime2 DataInicio
        datetime2 DataFim
    }
