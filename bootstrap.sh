#!/usr/bin/env bash

echo Updating apt-get
sudo apt-get update

echo Installing GIT
sudo apt-get install git

echo Installing other utils
sudo apt-get install -y pkg-config libcairo2-dev

echo Installing nodejs
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs

echo Fixing node permissions
sudo chown -R vagrant /usr/bin/node
sudo chown -R vagrant /usr/bin/npm
sudo chown -R vagrant /usr/lib/node_modules

echo Installing Grunt
npm install -g grunt

echo Installing Yeoman
npm install -g yo

echo Installing SASS
sudo chown -R vagrant /opt/vagrant_ruby
gem install sass --pre