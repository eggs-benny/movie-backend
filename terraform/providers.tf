provider "aws" {
  region = "eu-west-2"
}

provider "docker" {
  registry_auth {
    address = local.aws_ecr_url
    username = data.aws_ecr_authorization_token.token.username
    password = data.aws_ecr_authorization_token.token.password
  }
}