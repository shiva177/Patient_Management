const express = require('express');
const logger = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const patientRoutes = require('./routes/patientRoutes');
const path = require('path');

const app = express();
app.use(express.json());
app.use(logger);
app.use('/api/patients', patientRoutes);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('✅ Backend is running! Try hitting `/api/patients` for real data.');
});


module.exports = app;
