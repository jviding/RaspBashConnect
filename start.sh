#!/bin/bash
#Run index.js
node index.js
#Wait node to finish
wait
#Read IP
value=$(<ip.txt)
#Establish SSH connection
ssh -p 5000 jviding@"$value"