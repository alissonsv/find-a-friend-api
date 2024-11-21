# Find A Friend - API

API para adoção de animais

## Requisitos Funcionais

- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [X] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG

## Regras de Negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [X] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Requisitos Não-Funcionais

- [X] A senha do usuário precisa estar criptografada
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT


## Diagrama ER
```mermaid
erDiagram
    ORG {
        string id PK
        string name
        string email
        string password
        string manager_name
        string whatsapp
        string address
        string cep
        string city
        datetime created_at
        datetime updated_at
    }

    PET {
        string id PK
        string org_id FK
        string name
        string about
        string age "enum(PUPPY, ADULT)"
        string size "enum(SMALL, MEDIUM, LARGE)"
        string energy_level "enum(LOW, MEDIUM, HIGH)"
        string environment "enum(SMALL, MEDIUM, LARGE)"
        datetime created_at
        datetime updated_at
    }

    REQUIREMENT {
        string id PK
        string description
        datetime created_at
        datetime updated_at
    }

    PET_REQUIREMENT {
        string pet_id PK,FK
        string requirement_id PK,FK
        datetime created_at
        datetime updated_at
    }

    ORG ||--o{ PET : has
    PET ||--o{ PET_REQUIREMENT : has
    REQUIREMENT ||--o{ PET_REQUIREMENT : "is used in"
```