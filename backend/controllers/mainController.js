const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    const user = req.user;
    let photos = [];
    let nextPage = null;
    let prevPage = null;

    if (user && user.photos && user.photos.data) {
        photos = user.photos.data;
        nextPage = user.photos.paging ? user.photos.paging.next : null;
        prevPage = user.photos.paging ? user.photos.paging.previous : null;
    }

    res.render('index', {
        data: { title: 'Página Principal', description: 'Descripción de la página principal' },
        user,
        photos,
        nextPage,
        prevPage
    });
});

router.get('/paginate', async (req, res) => {
    const userId = req.user.id;
    const after = req.query.after;
    const before = req.query.before;

    if (!after && !before) {
        return res.redirect('/');
    }

    const accessToken = req.user.accessToken; // Asegúrate de que el token de acceso está disponible

    let apiUrl = `https://graph.facebook.com/v20.0/${userId}/photos?fields=created_time,id,name,link,images&limit=25&pretty=0`;
    if (after) {
        apiUrl += `&after=${after}`;
    } else if (before) {
        apiUrl += `&before=${before}`;
    }

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const newPhotos = response.data.data;
        const newNextPage = response.data.paging ? response.data.paging.next : null;
        const newPrevPage = response.data.paging ? response.data.paging.previous : null;

        res.render('index', {
            data: { title: 'Página Principal', description: 'Descripción de la página principal' },
            user: req.user,
            photos: newPhotos,
            nextPage: newNextPage,
            prevPage: newPrevPage
        });
    } catch (error) {
        console.error('Error fetching paginated page:', error);
        res.redirect('/');
    }
});

module.exports = router;
