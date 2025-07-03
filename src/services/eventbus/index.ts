import { EventEmitter } from 'events';

export type EventHandler<T = unknown> = (payload: T) => void;

class EventBus {
  private emitter = new EventEmitter();

  // Publicar evento
  public publish<T = unknown>(event: string, payload: T) {
    this.emitter.emit(event, payload);
  }

  // Escutar evento
  public subscribe<T = unknown>(event: string, handler: EventHandler<T>) {
    this.emitter.on(event, handler);
  }

  // Remover listener
  public unsubscribe<T = unknown>(event: string, handler: EventHandler<T>) {
    this.emitter.off(event, handler);
  }
}

// Instância global (singleton)
export const eventBus = new EventBus();

// Exemplo de uso:
// eventBus.subscribe('user.created', (data) => { ... })
// eventBus.publish('user.created', { id: '123' })
// Estrutura pronta para futura troca por Redis/Kafka 