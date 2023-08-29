import { EffectScope, getCurrentScope, onScopeDispose, effectScope } from "vue";

/**
 * 複数のVueインスタンスで使用可能なコンポーザブル関数を作成する
 * https://vueuse.org/createSharedComposable
 */
export const createSharedComposable = <Fn extends (...args: any[]) => any>(composable: Fn): Fn => {
  let subscribers = 0;
  let state: ReturnType<Fn> | undefined;
  let scope: EffectScope | undefined;

  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = undefined;
      scope = undefined;
    }
  };

  return <Fn>((...args) => {
    subscribers += 1;
    if (!state) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    if (getCurrentScope()) {
      onScopeDispose(dispose);
    }
    return state;
  });
};
