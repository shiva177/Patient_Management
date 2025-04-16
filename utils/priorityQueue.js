class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(patient) {
    this.queue.push(patient);
    this.queue.sort((a, b) => {
      if (a.triageLevel !== b.triageLevel)
        return a.triageLevel - b.triageLevel;
      return a.arrivalTime - b.arrivalTime;
    });
  }

  dequeue() {
    return this.queue.shift();
  }

  getAll() {
    return this.queue;
  }

  findById(id) {
    return this.queue.find(p => p.id === id);
  }

  removeById(id) {
    this.queue = this.queue.filter(p => p.id !== id);
  }
}

module.exports = new PriorityQueue();
