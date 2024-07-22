const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');

// Ruta de autenticación con Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_photos'] }));

// Ruta de callback de Facebook
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

// Ruta de autenticación con Instagram
router.get('/instagram', passport.authenticate('instagram'));

// Ruta de callback de Instagram
router.get('/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Ruta para cargar más fotos
router.get('/facebook/more-photos', async (req, res) => {
    if (req.isAuthenticated() && req.user && req.user.photos && req.user.photos.paging && req.user.photos.paging.next) {
        try {
            const response = await axios.get(req.user.photos.paging.next);
            const morePhotos = response.data;
            res.json(morePhotos);
        } catch (err) {
            console.error('Error fetching more photos:', err);
            res.status(500).json({ error: 'Error fetching more photos' });
        }
    } else {
        res.status(400).json({ error: 'No more photos available' });
    }
});

module.exports = router;
