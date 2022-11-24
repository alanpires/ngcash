# Ng Cash

Esse é um projeto fullstack, cujo objetivo é possibilitar que usuários consigam realizar transferências entre si.

## Instalação do Docker

Para rodar essa aplicação é necessário ter o Docker e o Docker Compose instalados.

## Como rodar a aplicação?

1. Crie um arquivo .env na raiz da aplicação seguindo o exemplo contido no arquivo .env.example.
2. Execute o seguinte comando:

```
docker-compose up
```

## Acessando a aplicação

Após os conteineres terem subido, você poderá acessar a aplicação pelos seguintes endpoints:

- `http://localhost:8008` - Aplicação React
- `http://localhost:9000` - API

## Endpoints:

Os detalhes da documentação da API estará disponível no endpoint `http://localhost:9000/docs`.

## URLs:

| Método | Endpoint             | Responsabilidade                                         |
| ------ | -------------------- | -------------------------------------------------------- |
| POST   | /accounts            | Criação de usuários (Não precisa de autenticação)        |
| POST   | login                | Faz a autenticação do usuário                            |
| GET    | /accounts            | Lista a conta do usuário (Somente usuários autenticados) |
| POST   | /transactions        | Cria uma nova transação (Somente usuários autenticados)  |
| POST   | /transactions/filter | Filtragem de transações (Somente usuários autenticados)  |
| GET    | /transactions        | Lista as transações (somente usuários autenticados)      |
| GET    | /docs                | Documentação da API                                      |

## Desligando

Para remover o aplicativo, você pode usar executar este comando:

```
docker-compose down
```
