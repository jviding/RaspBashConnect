# RaspBashConnect
Scripted access to RaspBerry Pi from terminal.

## How to?

Clone repository to your computer.<br>
Create 'token.txt' and 'ip.txt' to the project root.<br>
Set password and username in secret.js.<br>

Install node modules with <br>
$ npm install

Give permissions for the bash file to execute<br>
$ chmod 755 start.sh

Now you can launch the app from the root with<br>
$ ./start.sh

## Recommended extra

Create a new folder under your home<br>
$ mkdir ~/bin

Add the directory into your PATH <br>
$ export PATH=$PATH:~/bin

Create a new file named 'raspi'<br>
$ nano raspi

Copy the following lines into it:<br>
$ #!/bin/bash<br>
$ #Go to project folder<br>
$ cd /home/USERNAME/bin/RaspBashConnect  <-- Path to project root<br>
$ #Launch app<br>
$ ./start.sh<br>

Add permissions<br>
$ chmod +x raspi

Enjoy!<br>
Now you can launch SSH connection to your RaspBerry Pi by just typing<br>
$ raspi<br>
in the terminal!
