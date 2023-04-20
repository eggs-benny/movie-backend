terraform {
  required_providers {
    docker = {
      source = "kreuzewerker/docker"
      version = "2.15.0"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "eggs-benny"

    workspaces {
      prefix = "movie-backend-zone"
    }
  }
}