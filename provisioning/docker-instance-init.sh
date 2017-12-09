#!/bin/bash

exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

sudo yum -y update
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins.io/redhat/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key

sudo yum -y remove java-1.7.0-openjdk
sudo yum -y install java-1.8.0

# Install docker
sudo yum -y install docker
sudo pip install docker-compose
sudo pip install backports.ssl_match_hostname --upgrade

sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Git
sudo yum install -y ecs-init
sudo gpasswd -a jenkins docker
sudo service docker start
sudo chkconfig docker on
sudo yum install git -y

# Install Jenkins
sudo yum install jenkins -y
sudo usermod -a -G docker jenkins

sudo service jenkins start
sudo chkconfig jenkins on

touch ec2-init-done.markerfile