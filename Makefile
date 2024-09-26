VERSION := $(shell grep -m1 version package.json | sed 's/.*: "\(.*\)",/\1/')
REPO_NAME := $(shell grep -m1 name package.json | sed 's/.*: "\(.*\)",/\1/')
K8S_DEPLOYMENT = k8s/deployment.yaml
DOCKERFILE = Dockerfile

.PHONY: run build docker-build clean

release: docker-build docker-push apply-k8s require-repository

bump-version:
	@echo "Bumping version"
	@npm version patch

docker-build:
	@echo "Building docker image $(REPO_NAME):$(VERSION)"
	@docker stop $(REPO_NAME) || true
	@docker rm $(REPO_NAME) || true
	@docker build -t $(REPO_NAME):$(VERSION) -f $(DOCKERFILE) .

docker-build-dev:
	@echo "Building docker image $(REPO_NAME):$(VERSION)"
	@docker stop $(REPO_NAME) || true
	@docker rm $(REPO_NAME) || true
	@docker build -t $(REPO_NAME):$(VERSION) -f dev.$(DOCKERFILE) .

docker-run:
	@echo "Running docker image $(REPO_NAME):$(VERSION)"
	@docker run --name $(REPO_NAME) -p 3000:3000 $(REPO_NAME):$(VERSION)

docker-push: require-repository
	docker tag $(REPO_NAME):$(VERSION) $(REPOSITORY)/$(REPO_NAME):$(VERSION)
	docker push $(REPOSITORY)/$(REPO_NAME):$(VERSION)

require-repository:
	@if (test -z $(REPOSITORY)); then echo "REPOSITORY is required"; exit 1; fi

k8s-deploy:
	@sed -e 's/{{VERSION}}/$(VERSION)/g' -e 's/{{REPO_NAME}}/$(REPO_NAME)/g' $(K8S_DEPLOYMENT) | kubectl apply -f -

docker-clean:
	@echo "Removing docker image $(REPO_NAME):$(VERSION)"
	@docker stop $(REPO_NAME) || true
	@docker rm $(REPO_NAME) || true
	@docker rmi $(REPO_NAME):$(VERSION) || true


clean:
	rm -rf node_modules
	rm -rf .next
