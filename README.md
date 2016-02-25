# RaspBashConnect
Scripted access to RaspBerry Pi from terminal.

## How to?

Clone repository to your computer.
Create 'token.txt' and 'ip.txt' to the project root.
Set password and username in secret.js.

Install node modules with 
$ npm install

Give permissions for the bash file to execute
$ chmod 755 start.sh

Now you can launch the app from the root with
$ ./start.sh

## Recommended extra

Create a new folder under your home
$ mkdir ~/bin

Add the directory into your PATH 
$ export PATH=$PATH:~/bin

Create a new file named 'raspi'
$ nano raspi

Copy the following lines into it:
$ #!/bin/bash
$ #Go to project folder
$ cd /home/<username>/bin/RaspBashConnect  <-- Path to project root
$ #Launch app
$ ./start.sh

Add permissions
$ chmod +x raspi

Enjoy!
Now you can launch SSH connection to your RaspBerry Pi by just typing
$ raspi
in the terminal!
