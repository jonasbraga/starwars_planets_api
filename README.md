# Starwars Planets API

# :rocket: Features

* :white_check_mark: Cadastrar planetas
* :page_facing_up: Listas planetas
* :arrows_counterclockwise: Atualizar planetas
* :x: Deletar planetas

# :construction_worker: Installation

**Antes de tudo você precisa ter instalado o [docker](https://docs.docker.com/engine/install/) e [docker-compose](https://docs.docker.com/compose/install/), após este basta baixar o repositório através do seguinte comando:**

```git clone https://github.com/jonasbraga/starwars_planets_api.git```

**Renomeie o arquivo <code>.env-example</code> para <code>.env</code> e adicione as respectivas variáveis:**

```
PORT=3000
DB_HOST=db
DB_PORT=27017
DB_NAME=starwars
```
*Obs: Certifique-se de que as portas acima não estejam sendo utilizadas por nenhum outro serviço*

# :runner: Getting Started

Execute o seguinte comando na raiz do projeto para subir os containers e disponibilizar o serviço:

```make up```

Caso deseje visualizar os tests, execute o seguinte comando que irá trazer o coverage:

```make tests```

# :memo: APIs Documentation

**Para visualizar a documentação da API acesse o seguinte link: [Star Wars Planets API](https://documenter.getpostman.com/view/15371583/TzJpgz2J)**

*A collection também está disponível na pasta postman do projeto, basta fazer o import na ferramenta e começar a fazer as requests* ;)
