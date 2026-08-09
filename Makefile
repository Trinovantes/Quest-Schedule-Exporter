print-%: ; @echo $*=$($*)

export GIT_HASH                 := $(shell git rev-parse HEAD)
export DOCKER_BUILDKIT          := 1
export COMPOSE_DOCKER_CLI_BUILD := 1

.PHONY: build stop run all pull push clean

all: build run

# -----------------------------------------------------------------------------
# Vars
# -----------------------------------------------------------------------------

web-dockerfile = ./docker/web.Dockerfile
web-container = questscheduleexporter-web
web-image = ghcr.io/trinovantes/$(web-container)

# -----------------------------------------------------------------------------
# Commands
# -----------------------------------------------------------------------------

build: \
	build-web

stop: \
	stop-web

run: \
	run-web

pull:
	docker pull $(web-image) --quiet

push:
	docker push $(web-image) --quiet

clean:
	rm -rf ./dist
	docker container prune -f
	docker image prune -f

# -----------------------------------------------------------------------------
# Web
# -----------------------------------------------------------------------------

web: build-web run-web

build-web:
	docker build \
		--file $(web-dockerfile) \
		--tag $(web-image) \
		--progress=plain \
		--secret id=GIT_HASH \
		.

stop-web:
	docker stop $(web-container) || true
	docker rm $(web-container) || true

run-web: stop-web
	docker run \
		--publish 9070:80 \
		--network nginx-network \
		--log-driver local \
		--restart=always \
		--detach \
		--name $(web-container) \
		$(web-image)
