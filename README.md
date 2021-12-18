# Starwars Planets API

# :rocket: Features

* :white_check_mark: Create planets
* :page_facing_up: Show planets
* :arrows_counterclockwise: Update planets
* :x: Delete planets

# :construction_worker: Installation

**First of all you need to have [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed, after that just clone this repository with the following command:**

```git clone https://github.com/jonasbraga/starwars_planets_api.git```

**In the project's root folder, execute the command ```make prepare``` to copy the file ```.env.example``` to ```.env``` and set the environment variables**

*P.S.: Make sure that the ports 3000 and 27017 are not being used by any other application, otherwise a conflict will happens*

# :runner: Getting Started

Run the following command at the root of the project to run the containers and enable the services:

```make up```

In order to run the tests, execute the following command that will bring up coverage:

```make tests```

# :memo: API's Documentation

**To view the API documentation go to: [Star Wars Planets API](https://documenter.getpostman.com/view/15371583/TzJpgz2J)**


*The postman collection is also available in its folder, so if you want to, just import that in the application and start making the requests* ;)
