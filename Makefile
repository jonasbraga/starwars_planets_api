USER=root
red=`tput setaf 1`
green=`tput setaf 2`
white=`tput setaf 7`
blue=`tput setaf 4`
set_prod_db=`sed -i '/DB_NAME=*/c\DB_NAME=starwars' .env`
set_test_db=`sed -i '/DB_NAME=*/c\DB_NAME=starwars-tests' .env`

build:
	docker-compose build

up:
	${set_prod_db}
	docker-compose up
	
tests:
	${set_test_db}
	docker-compose up -d
	docker-compose exec server npm run test:cov
	make down

down:
	docker-compose down

start:
	docker-compose start

stop:
	docker-compose stop

sh:
	docker-compose exec --user=${USER} server sh

sh\:db:
	docker-compose exec db bash

help:
	@ echo "$(green) make build	$(white) Build or rebuild services"
	@ echo "$(green) make up	$(white) Run application containers"
	@ echo "$(green) make down	$(white) Stops containers and $(red)REMOVES $(white)containers and networks created by $(green)make up"
	@ echo "$(green) make start	$(white) Starts existing containers after $(green)make stop"
	@ echo "$(green) make stop	$(white) Stops running containers without removing them. They can be started again with $(green)make start"
	@ echo "$(green) make sh	$(white) Connects to the server container by sh"
	@ echo "$(green) make sh:db	$(white) Connects to the database container by sh"
