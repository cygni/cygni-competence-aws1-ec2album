#!/bin/bash

cd /home/ec2-user
sudo yum update -y
sudo curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -
sudo yum install git nodejs -y
git clone https://github.com/cygni/cygni-competence-aws1-ec2album.git ec2-album
cd ec2-album
sed -i 's/examplebucket/ACTUALBUCKETNAME/g' index.js
npm install
sudo node index.js
