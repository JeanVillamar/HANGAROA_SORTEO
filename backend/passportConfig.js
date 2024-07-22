const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const axios = require('axios');

passport.use(new InstagramStrategy({
    clientID: 'TU_CLIENT_ID', // Reemplaza con tu clientID de Instagram
    clientSecret: 'TU_CLIENT_SECRET', // Reemplaza con tu clientSecret de Instagram
    callbackURL: 'https://localhost:3200/auth/instagram/callback',
    scope: ['user_profile'],
    passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Intercambiar el código de autorización por un token de acceso
        const response = await axios.post('https://api.instagram.com/oauth/access_token', {
            client_id: 'TU_CLIENT_ID', // Reemplaza con tu clientID de Instagram
            client_secret: 'TU_CLIENT_SECRET', // Reemplaza con tu clientSecret de Instagram
            grant_type: 'authorization_code',
            redirect_uri: 'https://localhost:3200/auth/instagram/callback',
            code: req.query.code
        });

        const accessToken = response.data.access_token;

        // Obtener el ID del usuario con el token de acceso
        const userResponse = await axios.get(`https://graph.instagram.com/me?fields=id&access_token=${accessToken}`);
        const user = userResponse.data;

        return done(null, user); // Devuelve el usuario directamente
    } catch (err) {
        console.error('Error fetching user profile:', err);
        console.error('Response data:', err.response ? err.response.data : 'No response data');
        return done(err);
    }
}));

passport.use(new FacebookStrategy({
    clientID: '1171945480666514', // Reemplaza con tu clientID de Facebook
    clientSecret: 'f800630abadf71f993634edf0620335b', // Reemplaza con tu clientSecret de Facebook
    callbackURL: 'https://localhost:3200/auth/facebook/callback',
    scope: ['email', 'user_photos'], // Asegúrate de solicitar los permisos adecuados
    passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Obtener el perfil del usuario con el token de acceso
        const userResponse = await axios.get(`https://graph.facebook.com/me?fields=id,photos{created_time,id,name,link,images}&access_token=${accessToken}`);
        const user = userResponse.data;

        // Agregar el token de acceso al objeto de usuario
        user.accessToken = accessToken;

        return done(null, user); // Devuelve el usuario directamente
    } catch (err) {
        console.error('Error fetching user profile:', err);
        console.error('Response data:', err.response ? err.response.data : 'No response data');
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
