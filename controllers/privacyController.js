const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Ruta para manejar la solicitud de eliminación de datos
router.post('/delete-data', (req, res) => {
    const userId = req.body.user_id; // El ID del usuario debe ser proporcionado en la solicitud

    // Encuentra y elimina el usuario de la base de datos
    const user = userModel.findUser(userId);
    if (user) {
        userModel.deleteUser(userId);
        res.status(200).send({ message: 'Datos del usuario eliminados correctamente.' });
    } else {
        res.status(404).send({ message: 'Usuario no encontrado.' });
    }
});

module.exports = router;
