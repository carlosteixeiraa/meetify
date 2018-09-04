var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var rp = require('request-promise');
var app = express();

app.set('view engine', 'pug');

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/profile', (req, res) => {
    res.send('profile');
});

var authCode;
app.get('/info', (req, res) => {
    res.render('info');
    authCode = req.query.code;

    var call = {
        uri: 'https://api.spotify.com/v1/me',
        headers: {
            '': authCode
        },
        json: true
    };



});

var redirect_uri = 'http://localhost:3000/info';
var clientId = '8c6a4fcab1694399a5d2768afec3884b';

app.get('/login', (req, res) => {
    var scopes = 'user-read-private user-read-email user-library-read playlist-read-private playlist-read-collaborative';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + clientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.listen(3000, () => {
    console.log('meetify app beta running in debugging.')
});