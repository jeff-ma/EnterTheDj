const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./routes/api');
const authorize = require('./routes/authorize');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// authorize first before serving
app.use('/', authorize);
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/api', api);
app.use('/*', express.static(path.join(__dirname, '../client/build')));
app.listen(port, () => {
    console.log("Server listening on port " + port);
});