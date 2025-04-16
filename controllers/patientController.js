const Joi = require('joi');
const {
  addPatient,
  getQueue,
  treatPatient,
  dischargePatient
} = require('../services/queueService');

const patientSchema = Joi.object({
  name: Joi.string().required(),
  triageLevel: Joi.number().integer().min(1).max(5).required()
});

exports.addPatient = (req, res, next) => {
  try {
    const { error, value } = patientSchema.validate(req.body);
    if (error) throw error;

    const patient = addPatient(value.name, value.triageLevel);
    req.io.emit('new-patient', patient);

    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

exports.getQueue = (req, res) => {
  const queue = getQueue();
  res.json(queue);
};

exports.treatPatient = (req, res, next) => {
  try {
    const patient = treatPatient(req.params.id);
    req.io.emit('patient-treated', patient);

    res.json(patient);
  } catch (err) {
    next(err);
  }
};

exports.dischargePatient = (req, res, next) => {
  try {
    const patient = dischargePatient(req.params.id);
    req.io.emit('patient-discharged', { id: req.params.id, patient });

    res.json({ message: 'Patient discharged', patient });
  } catch (err) {
    next(err);
  }
};

