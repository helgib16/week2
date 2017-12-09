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


# Installing Node version manager
#curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
#export NVM_DIR="$HOME/.nvm"
#[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
#[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Install node 6.9.1
#nvm install 6.9.1
#nvm install npm

touch ec2-init-done.markerfile