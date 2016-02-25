var request = require('request');
var secret = require('./secret');
var fs = require('fs');
var tokenFile = __dirname+'/token.txt';
var ipFile = __dirname+'/ip.txt';
var url = 'http://cloud.mrjasu.com/api';


var name = secret.username;
var psw = secret.password;

console.log('Fetching IP...');
getIp(function (item) {
	if (item.success) {
		console.log('Received '+item.ip);
		console.log('Starting SSH connection...');
		ipReceived(item);
	} else {
		console.log('Token expired...\nGenerating a new token.')
		authenticate(function (auth) {
			if (!auth.success) {
				console.log('JasuCloud authentication failed.');
			} else {
				console.log('Authentication successful.');
				getIp(function (ip) {
					if (ip.success == false) {
						console.log('IP-service unavailable.');
					} else {
						console.log('Starting SSH connection...');
						ipReceived(ip);
					}
				});
			}
		});
	}
});

function ipReceived(item) {
	writeToFile(ipFile, item.ip, function () {
		process.exit();
	});
};

function getIp (callback) {
	readToken(function (token) {
		request({
			url: url+'/getip',
			headers: {
				'x-access-token': token
			}
		}, function (err, response, body) {
			if (err) throw err;
			callback(JSON.parse(body));
		});
	});
};

function authenticate (callback) {
	request.post({
		url: url+'/authenticate', 
		form: { 
			name: name, 
			password: psw 
		}
	}, function (err, httpResponse, body) {
		    if (err) throw err;
		    var res = JSON.parse(httpResponse.body);
		    writeToFile(tokenFile, res.token, null);
		    callback(res);
	});
};

function writeToFile (file, txt, callback) {
	fs.writeFile(file, txt, function (err) {
		if (err) throw err;
		if (callback != null) {
			callback;
		}
	});
};

function readToken (callback) {
	fs.readFile(tokenFile, 'utf8', function (err, data) {
  		if (err) throw err;
  		callback(data);
	});
};