const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001
const medicoRoutes = require('./vista/medicoRutas')
const pacienteRoutes = require('./vista/pacienteRutas')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/medicos', medicoRoutes);
app.use('/pacientes', pacienteRoutes);

app.get('/', (req, res) => {
    res.send('API de medicos funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor Corriendo en http://localhost:${PORT}`);
});
