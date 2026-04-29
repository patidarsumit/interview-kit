type AppEvents = {
  login: { userId: string };
  logout: { userId: string };
  error: { message: string; code?: string };
};

class TypedEventEmitter<TEvents extends object> {
  private listeners: {
    [K in keyof TEvents]?: Array<(payload: TEvents[K]) => void>;
  } = {};

  on<K extends keyof TEvents>(
    event: K,
    listener: (payload: TEvents[K]) => void,
  ): () => void {
    this.listeners[event] ??= [];
    this.listeners[event]?.push(listener);

    return () => this.off(event, listener);
  }

  off<K extends keyof TEvents>(
    event: K,
    listener: (payload: TEvents[K]) => void,
  ): void {
    this.listeners[event] = this.listeners[event]?.filter(
      (currentListener) => currentListener !== listener,
    );
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
    this.listeners[event]?.forEach((listener) => listener(payload));
  }
}

const emitter = new TypedEventEmitter<AppEvents>();

const unsubscribe = emitter.on('login', (payload) => {
  console.log(payload.userId);
});

emitter.emit('login', { userId: 'u1' });
unsubscribe();

