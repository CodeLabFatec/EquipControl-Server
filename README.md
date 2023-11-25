<br id="topo">

<h1 align="center">EquipControl - Server</h1>

> **Projeto Integrador 5º Semestre ADS - 2023** <br> **Status do projeto: Finalizado**

Esse repositório é destinado ao armazenamento do backend desenvolvido para o projeto [EquipControl](https://github.com/CodeLabFatec/EquipControl) .

<br />

<span id="doc-api">

## Documentação API

Documentação dos métodos de autenticação, listagem de equipamentos e realização de manobras para um determinado equipamento.

### Rota: `/auth/login`

- **Método:** `POST`
- **Descrição:** Rota de autenticação, utilizada para obter um token de autenticação.
- **Parâmetros de entrada:**
  - `username` (string): Nome de usuário do usuário.
  - `password` (string): Senha do usuário.
- **Exemplo de Requisição:**
  ```json
  {
    "username": "usuario123",
    "password": "senha@123"
  }
- **Resposta de Sucesso (200):**
  - `token` (string): Token de autenticação válido.
  - `user` (object): Usuário autenticado.
- **Respostas de Erro:**
  - `401 Unauthorized`: Falha na autenticação.
  - `422 Unprocessable Entity`: Parâmetros inválidos ou incompletos.
  - `500 Internal Server Error`: Erro de comunicação com o servidor.

<br />

### Rota: `/equipment/get`

- **Método:** `GET`
- **Descrição:** Rota para listar todos os equipamentos cadastrados.
- **Headers:**
  ```
  Authorization: Bearer <token>.
- **Resposta de Sucesso (200):**
  - `equipments` (array): Lista (array) com todos os equipamentos cadastrados e suas propriedades.
- **Respostas de Erro:**
  - `401 Unauthorized`: Não autenticado.
  - `500 Internal Server Error`: Erro de comunicação com o servidor.

<br />

### Rota: `/equipment/updateStatus/:id`

- **Método:** `PATCH`
- **Descrição:** Rota para listar todos os equipamentos cadastrados.
- **Headers:**
  ```
  Authorization: Bearer <token>.
- **Parâmetros de entrada:**
  - `id` (string): Id (_id) do equipamento. (query)
  - `isActive` (boolean): Novo status para o equipamento. (body)
- **Exemplo de Requisição:**
  ```json
  {
    "isActive": false
  }
- **Resposta de Sucesso (201):**
  - `equipment` (object): Equipamento atualizado.
- **Respostas de Erro:**
  - `400 Bad Request`: Parâmetros inválidos ou incompletos.
  - `401 Unauthorized`: Não autenticado.
  - `404 Not Found`: Equipamento não encontrado.
  - `422 Unprocessable Entity`: Parâmetros inválidos ou incompletos.
  - `500 Internal Server Error`: Erro de comunicação com o servidor.

<span id="tecnologias">

## 🛠️ Tecnologias

Tecnologias utilizadas para o desenvolvimento desse backend do projeto:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

<br />

<span id="equipe">

## 👩‍💻 Equipe

| Função | Nome | GitHub | LinkedIn |
| ------ | ---- | ------ | ---------|
| Scrum Master  | Eduardo Pereira Carvalho | <a href="https://github.com/eduardopereiracarvalho" target="_blanck"><img src = "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a> | <a href="https://www.linkedin.com/in/eduardo-carvalho-0a1411213/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> |
| Product Owner | Thales de Lucca Kerber | <a href="https://github.com/thaleskerber" target="_blanck"><img src = "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a> | <a href="https://www.linkedin.com/in/thaleskerber/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> |
| Developer | Lucas Nunes Duarte do Nascimento | <a href="https://github.com/Lkduarte" target="_blanck"><img src = "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a> | <a href="https://www.linkedin.com/in/lucas-nunes-nascimento/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> |
| Developer | Victoria Marto Dias | <a href="https://github.com/DiasVitoria" target="_blanck"><img src = "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a> | <a href="https://www.linkedin.com/in/diasvictoria/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> |

<br>

→ [Voltar ao topo](#topo)

<br>

<div align='center' height='70'>
  
![Logo Fatec](https://github.com/thaleskerber/Projeto-Integrador-4-Semestre/assets/26208169/c5407beb-d912-41da-afbb-13b054a55885)

</div>
