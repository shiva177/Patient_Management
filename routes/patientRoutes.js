const express = require('express');
const router = express.Router();
const {
  addPatient,
  getQueue,
  treatPatient,
  dischargePatient
} = require('../controllers/patientController');

const { io } = require('../sockets/realTimeNotifier');


router.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
router.post('/', addPatient);
router.get('/', getQueue);
router.put('/:id/treat', treatPatient);
router.delete('/:id', dischargePatient);

module.exports = router;
