export class EventEmitter {
  listeners = {};  // key-value pair

  addListener(eventName, fn) {
    const events = this.listeners[eventName] ?? [];
    this.listeners[eventName] = [...events, fn];
    return this;
  }

  on(eventName, fn) {
    return this.addListener(eventName, fn)
  }

  removeListener(eventName, fn) {
    const events = this.listeners[eventName] ?? [];
    this.listeners[eventName] = events.filter(el => el !== fn);
    return this;
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const once = (...args) => {
      fn(...args);
      this.off(eventName, once);
    };
    this.addListener(eventName, once);
    return this;
  }

  emit(eventName, ...args) {
    const events = this.listeners[eventName] ?? [];
    if (!events.length) {
      return false;
    }
    events.forEach(fn => fn(...args));
    return true;
  }

  listenerCount(eventName) {
    return this.rawListeners(eventName).length
  }

  rawListeners(eventName) {
    return this.listeners[eventName] ?? []
   }
}