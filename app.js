var express    = require('express');
var app        = express();

app.use(express.static('build'));

app.listen(process.env.BBR_PORT || 8888);
console.log('bbr.kudesnik.cc started, port: ' + (process.env.BBR_PORT || 8888));