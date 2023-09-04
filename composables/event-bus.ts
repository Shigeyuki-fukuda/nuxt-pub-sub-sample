export type EventBusListener<T = unknown, P = any> = (event: T, payload?: P) => void;
export type EventBusEvents<T, P = any> = EventBusListener<T, P>[];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface EventBusKey<T> extends Symbol {}
export type EventBusIdentifier<T = unknown> = EventBusKey<T> | string | number;
export const events = new Map<EventBusIdentifier<any>, EventBusEvents<any>>();

export interface UseEventBusReturn<T, P> {
  /**
   * サブスクライブする
   *
   * @param listener イベントリスナー
   * @returns 解除する関数
   */
  on: (listener: EventBusListener<T, P>) => () => void;
  /**
   * 一度だけサブスクライブする
   *
   * @param listener イベントリスナー
   * @returns 解除する関数
   */
  once: (listener: EventBusListener<T, P>) => () => void;

  /**
   * イベントを発行する
   *
   * @param event イベント
   * @param payload ペイロード
   */
  dispatch: (event?: T, payload?: P) => void;

  /**
   * イベントリスナーを解除する
   *
   * @param listener イベントリスナー
   */
  off: (listener: EventBusListener<T>) => void;

  /**
   * イベントリスナーをリセットする
   */
  reset: () => void;
}

/**
 * 参考 https://vueuse.org/useEventBus
 */
export const useEventBus = <T = unknown, P = any>(
  key: EventBusIdentifier<T>
): UseEventBusReturn<T, P> => {
  const on = (listener: EventBusListener<T, P>) => {
    const listeners = events.get(key) || [];
    listeners.push(listener);
    events.set(key, listeners);

    const _off = () => off(listener);
    // 自動でdisposedされるようにする
    onScopeDispose(_off);
    return _off;
  };

  const once = (listener: EventBusListener<T, P>) => {
    const _listener = (...args: [T, P | undefined]) => {
      off(_listener);
      listener(...args);
    };
    return on(_listener);
  };

  const off = (listener: EventBusListener<T>): void => {
    const listeners = events.get(key);
    if (!listeners) {
      return;
    }

    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
    if (!listeners.length) {
      events.delete(key);
    }
  };

  const reset = () => {
    events.delete(key);
  };

  const dispatch = (event?: T, payload?: P) => {
    events.get(key)?.forEach((v) => v(event, payload));
  };

  return { on, once, off, dispatch, reset };
};
