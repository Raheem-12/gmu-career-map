
# ============================================================
# HYPERLANE AWS INFRASTRUCTURE
# ============================================================
# Terraform defines the AWS infrastructure needed to host
# Hyperlane: networking, firewall rules, and an EC2 server.
#
# React builds the website.
# Docker packages the application with Nginx.
# Nginx serves the website to visitors.
# EC2 provides the cloud server running the container.
# ============================================================


# ------------------------------------------------------------
# 1. VPC — Our private network in AWS
# ------------------------------------------------------------
# Creates an isolated network for Hyperlane's infrastructure.
# The CIDR block defines the available private IP address range.
# DNS support allows resources to resolve domain names.

resource "aws_vpc" "hyperlane_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name    = "hyperlane-vpc"
    Project = "Hyperlane"
  }
}


# ------------------------------------------------------------
# 2. PUBLIC SUBNET — Where our EC2 server will live
# ------------------------------------------------------------
# Divides our VPC into a smaller network.
# Places the subnet in the us-east-1a Availability Zone.
# Automatically assigns public IPs to instances launched here
# unless overridden by their network configuration.

resource "aws_subnet" "hyperlane_public_subnet" {
  vpc_id                  = aws_vpc.hyperlane_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name    = "hyperlane-public-subnet"
    Project = "Hyperlane"
  }
}


# ------------------------------------------------------------
# 3. INTERNET GATEWAY — Connects the VPC to the internet
# ------------------------------------------------------------
# Provides a path for internet traffic to enter and leave
# our VPC when routing and security rules permit it.

resource "aws_internet_gateway" "hyperlane_igw" {
  vpc_id = aws_vpc.hyperlane_vpc.id

  tags = {
    Name    = "hyperlane-igw"
    Project = "Hyperlane"
  }
}


# ------------------------------------------------------------
# 4. ROUTE TABLE — Directs network traffic
# ------------------------------------------------------------
# Tells AWS where to send traffic from our subnet.
# 0.0.0.0/0 is the default route for IPv4 destinations.
# Internet-bound traffic is routed through our Internet Gateway.

resource "aws_route_table" "hyperlane_public_rt" {
  vpc_id = aws_vpc.hyperlane_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.hyperlane_igw.id
  }

  tags = {
    Name    = "hyperlane-public-rt"
    Project = "Hyperlane"
  }
}


# ------------------------------------------------------------
# 5. ROUTE TABLE ASSOCIATION — Applies routing to the subnet
# ------------------------------------------------------------
# Associates our custom route table with the public subnet.
# This makes the subnet use our Internet Gateway route.

resource "aws_route_table_association" "hyperlane_public_assoc" {
  subnet_id      = aws_subnet.hyperlane_public_subnet.id
  route_table_id = aws_route_table.hyperlane_public_rt.id
}


# ------------------------------------------------------------
# 6. SECURITY GROUP — Firewall for our EC2 server
# ------------------------------------------------------------
# Creates a virtual firewall attached to our EC2 instance.
# The rules below determine which connections are allowed.

resource "aws_security_group" "hyperlane_sg" {
  name        = "hyperlane-web-sg"
  description = "Security group for Hyperlane web server"
  vpc_id      = aws_vpc.hyperlane_vpc.id

  tags = {
    Name    = "hyperlane-web-sg"
    Project = "Hyperlane"
  }
}


# ------------------------------------------------------------
# 7. INBOUND RULE — Allow visitors to access Hyperlane
# ------------------------------------------------------------
# Allows incoming HTTP traffic using TCP port 80.
# 0.0.0.0/0 means visitors from any IPv4 address can connect.
# Other incoming connections are not allowed by these rules.

resource "aws_vpc_security_group_ingress_rule" "http" {
  security_group_id = aws_security_group.hyperlane_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  to_port           = 80
  ip_protocol       = "tcp"
}


# ------------------------------------------------------------
# 8. OUTBOUND RULE — Allow EC2 to access external services
# ------------------------------------------------------------
# Allows our EC2 instance to initiate outbound connections.
# This will help it download software and Docker images.
# -1 means all IP protocols.

resource "aws_vpc_security_group_egress_rule" "all_outbound" {
  security_group_id = aws_security_group.hyperlane_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}


# ------------------------------------------------------------
# 9. AMAZON LINUX AMI — Select our server operating system
# ------------------------------------------------------------
# Looks up a recent Amazon Linux 2023 machine image.
# An AMI is a template used to launch an EC2 instance.
# This is a data lookup, not a resource being created.

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}


# ------------------------------------------------------------
# 10. EC2 INSTANCE — The cloud server hosting Hyperlane
# ------------------------------------------------------------
# Creates a small Linux virtual machine in our public subnet.
# Attaches the Security Group to control network access.
# Assigns a public IP so visitors can reach the server.
#
# Later, we'll install Docker and run the Nginx container
# containing Hyperlane's production React files.

resource "aws_instance" "hyperlane_ec2" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.hyperlane_public_subnet.id
  vpc_security_group_ids = [aws_security_group.hyperlane_sg.id]

  

  # Run our startup script when EC2 first launches
  user_data = file("${path.module}/userdata.sh")

  # Update the EC2 resource
  iam_instance_profile = aws_iam_instance_profile.hyperlane_profile.name

  tags = {
    Name    = "hyperlane-ec2"
    Project = "Hyperlane"
  }
}


# ------------------------------------------------------------
# 11. IAM ROLE — Identity and permissions for EC2
# ------------------------------------------------------------
# Allows the EC2 service to assume this role.
# The role gives our server an AWS identity without
# storing permanent access keys on the machine.

resource "aws_iam_role" "hyperlane_ec2_role" {
  name = "hyperlane-ec2-ssm-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}


# ------------------------------------------------------------
# 12. IAM POLICY ATTACHMENT — Allow SSM management
# ------------------------------------------------------------
# Grants the EC2 role the permissions needed for
# Systems Manager's managed-instance functionality.

resource "aws_iam_role_policy_attachment" "ssm" {
  role       = aws_iam_role.hyperlane_ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# ------------------------------------------------------------
# ECR READ ACCESS — Allow EC2 to download Docker images
# ------------------------------------------------------------
# Grants our EC2 server permission to authenticate with ECR
# and download Hyperlane's Docker image.
#
# Read-only access: EC2 cannot upload or delete images.

resource "aws_iam_role_policy_attachment" "ecr_readonly" {
  role       = aws_iam_role.hyperlane_ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

# ------------------------------------------------------------
# 13. INSTANCE PROFILE — Connect IAM role to EC2
# ------------------------------------------------------------
# An instance profile is the mechanism used to attach
# an IAM role to an EC2 instance.

resource "aws_iam_instance_profile" "hyperlane_profile" {
  name = "hyperlane-ec2-profile"
  role = aws_iam_role.hyperlane_ec2_role.name
}
