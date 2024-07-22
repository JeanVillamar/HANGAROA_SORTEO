const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./passportConfig');
const fs = require('fs');
const https = require('https');
const app = express();

// Leer los certificados SSL
const privateKey = fs.readFileSync('ssl/key.pem', 'utf8');
const certificate = fs.readFileSync('ssl/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Importar y usar las rutas de los controladores
const mainRoutes = require('./controllers/mainController');
const authRoutes = require('./controllers/authController');
const privacyRoutes = require('./controllers/privacyController');

app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/privacy', privacyRoutes);

const PORT = 3200;
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`Servidor HTTPS escuchando en https://localhost:${PORT}`);
});
