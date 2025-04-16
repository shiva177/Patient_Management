const { addPatient, getQueue, treatPatient, dischargePatient } = require('../services/queueService');

test('adds and retrieves patients', () => {
  const p = addPatient('Test', 3);
  const queue = getQueue();
  expect(queue).toContainEqual(p);
});

test('treats a patient', () => {
  const p = addPatient('TreatMe', 2);
  const treated = treatPatient(p.id);
  expect(treated.status).toBe('being treated');
});

test('discharges a patient', () => {
  const p = addPatient('ByeBye', 4);
  const discharged = dischargePatient(p.id);
  expect(discharged.name).toBe('ByeBye');
});
