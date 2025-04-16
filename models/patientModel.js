class Patient {
  constructor(id, name, triageLevel, arrivalTime = new Date()) {
    this.id = id;
    this.name = name;
    this.triageLevel = triageLevel;
    this.arrivalTime = arrivalTime;
    this.status = 'waiting';
  }
}

module.exports = Patient;
