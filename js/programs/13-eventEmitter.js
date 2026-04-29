class EventEmitter {
  constructor() {
    this.events = {};
  }

  // ── Register a listener ────────────────────────────────
  on(event, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError(`Expected function, got ${typeof callback}`);
    }
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return this;
  }

  // ── Fire all listeners for an event ───────────────────
  emit(event, ...args) {
    if (!this.events[event]) return this;
    [...this.events[event]].forEach(cb => cb(...args));
    return this;
  }

  // ── Remove a specific listener ─────────────────────────
  off(event, callback) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter(fn => fn !== callback);
    if (this.events[event].length === 0) delete this.events[event];
    return this;
  }

  // ── BONUS: once() — fires exactly once then auto-removes ─
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper); // removes itself after first call
    };
    return this.on(event, wrapper);
  }

  // ── BONUS: removeAllListeners() ────────────────────────
  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {}; // nuke everything
    }
    return this;
  }
}

// ── Example Usage ───────────────────────────────────────
const emitter = new EventEmitter();

function greet(name) {
  console.log(`Hello, ${name}!`);
}

emitter.on('greet', greet);
emitter.emit('greet', 'Alice'); // Hello, Alice!

emitter.off('greet', greet);
emitter.emit('greet', 'Bob'); // (no output)

emitter.once('welcome', name => console.log(`Welcome, ${name}!`));
emitter.emit('welcome', 'Charlie'); // Welcome, Charlie!
emitter.emit('welcome', 'Dave'); // (no output)

emitter.on('test', () => console.log('Test 1'));
emitter.on('test', () => console.log('Test 2'));
emitter.removeAllListeners('test');
emitter.emit('test'); // (no output)