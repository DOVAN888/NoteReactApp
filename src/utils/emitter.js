import EventEmiter from 'events'

const _emitter = new EventEmiter();
_emitter.setMaxListeners(0)// unlimitter listner

export const emiter = _emitter;