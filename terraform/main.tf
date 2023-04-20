# resource "aws_ecr_repository" "backend_repository" {
#   name = "backend"
# }

# resource "aws_ecr_repository" "mongo_db_repository" {
#   name = "mongo"
# }

# resource "aws_security_group" "docker_security_group" {
#   name_prefix = "docker"
  
#   ingress {
#     from_port   = 27017
#     to_port     = 27017
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   ingress {
#     from_port   = 3000
#     to_port     = 3000
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# resource "aws_instance" "movie-backend-server" {
#   ami           = "ami-09744628bed84e434"
#   instance_type = "t2.micro"
#   user_data     = <<-EOF
#                   #!/bin/bash
#                   yum update -y
#                   amazon-linux-extras install docker -y
#                   service docker start
#                   docker login -u AWS -p $(aws ecr get-login-password --region eu-west-2) https://628028286124.dkr.ecr.eu-west-2.amazonaws.com
#                   docker pull mongo
#                   docker run -d --name mongodb -e NODE_ENV=production -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 mongo
#                   docker build -t 628028286124.dkr.ecr.eu-west-2.amazonaws.com/backend .
#                   docker run -d --name backend -e NODE_ENV=production -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password -e ME_CONFIG_MONGODB_URL=mongodb://admin:password@mongodb:27017/moviedbprod -p 3000:3000 628028286124.dkr.ecr.eu-west-2.amazonaws.com/backend
#                   EOF

#   tags = {
#     Name = "ubuntu-server"
#   }

#   vpc_security_group_ids = [aws_security_group.docker_security_group.id]
# }

# output "ecr_repository_name" {
#   value = aws_ecr_repository.backend_repository.name
# }


######

## Create ECR repository
resource "aws_ecr_repository" "repository" {
    for_each = toset(var.repository_list)
  name = each.key
}

## Build docker images and push to ECR
resource "docker_registry_image" "backend" {
    for_each = toset(var.repository_list)
    name = "${aws_ecr_repository.repository[each.key].repository_url}:latest"

    build {
        context = "."
        dockerfile = "Dockerfile"
    }  
}