const Patient = require('../models/patientModel');
const queue = require('../utils/priorityQueue');
const { io } = require('../sockets/realTimeNotifier');

let patientId = 1;
let staffCount = 5; 

function getQueueWithWaitEstimates() {
  const allPatients = queue.getAll();
  const avgTreatmentTime = 5;

  return allPatients.map((patient) => {
    const aheadInQueue = allPatients.filter(p =>
      p.triageLevel < patient.triageLevel ||
      (p.triageLevel === patient.triageLevel && p.arrivalTime < patient.arrivalTime)
    );

    const estimatedWaitTimeMins = aheadInQueue.length * avgTreatmentTime;

    return {
      ...patient,
      estimatedWaitTimeMins
    };
  });
}

function addPatient(name, triageLevel) {
  const patient = new Patient(patientId++, name, triageLevel);
  queue.enqueue(patient);


  if (triageLevel === 1) {
    io.emit('criticalAlert', {
      message: '🚨 Critical patient arrived!',
      patient
    });
  }

  if (queue.getAll().length > staffCount * 2) {
    io.emit('staffThreshold', {
      message: '⚠️ Patient-to-staff ratio exceeded!',
      currentQueueSize: queue.getAll().length,
      staffCount
    });
  }

  io.emit('queueUpdate', getQueueWithWaitEstimates());

  return patient;
}

function getQueue() {
  return getQueueWithWaitEstimates();
}

function treatPatient(id) {
  const patient = queue.findById(Number(id));
  if (!patient) throw new Error('Patient not found');

  patient.status = 'being treated';

  io.emit('queueUpdate', getQueueWithWaitEstimates());

  return patient;
}

function dischargePatient(id) {
  const patient = queue.findById(Number(id));
  if (!patient) throw new Error('Patient not found');

  queue.removeById(Number(id));

  io.emit('queueUpdate', getQueueWithWaitEstimates());

  return patient;
}

module.exports = {
  addPatient,
  getQueue,
  treatPatient,
  dischargePatient
};
