var request = require('request');
var secret = require('./secret');
var fs = require('fs');
var tokenFile = __dirname+'/token.txt';
var ipFile = __dirname+'/ip.txt';
var url = 'http://cloud.mrjasu.com/api';


var name = secret.username;
var psw = secret.password;

console.log(name+"\n"+psw);

getIp(function (item) {
	if (item.success) {
		ipReceived(item);
	} else {
		console.log('Token expired...\nGenerating a new token.')
		authenticate(function (auth) {
			if (!auth.success) {
				console.log('Failed to authenticate on JasuCloud.');
			} else {
				console.log('Authentication successful.');
				getIp(function (ip) {
					if (ip.success) {
						console.log('IP-service unavailable.');
					} else {
						ipReceived(ip);
					}
				});
			}
		});
	}
});

function ipReceived(item) {
	console.log('writing...'+item.ip);
	writeToFile(ipFile, item.ip);
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
		    writeToFile(tokenFile, res.token);
		    callback(res);
	});
};

function writeToFile (file, txt) {
	fs.writeFile(file, txt, function (err) {
		if (err) throw err;
	});
};

function readToken (callback) {
	fs.readFile(tokenFile, 'utf8', function (err, data) {
  		if (err) throw err;
  		callback(data);
	});
};