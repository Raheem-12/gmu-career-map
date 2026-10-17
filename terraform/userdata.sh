#!/bin/bash
set -euxo pipefail

# Update installed Linux packages
dnf update -y

# Install Docker
dnf install -y docker

# Start Docker immediately
systemctl start docker

# Enable Docker to start after reboots
systemctl enable docker

# Allow the default EC2 user to run Docker commands
usermod -aG docker ec2-user
