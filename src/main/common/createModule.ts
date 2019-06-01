import React from 'react';
type Nullable<T> = T | null;
type ActionMap = { [actionName: string]: Nullable<(...args: any[]) => {}> };
type ConvertActions<T> = { [P in keyof T]: ToAction<T[P]> };
type AnyAction = { type: string };

export const createModule = <ActionSources extends ActionMap>(name: string, actionSources: ActionSources) => {
  const context = React.createContext<{
    state: any;
    dispatch: <T extends AnyAction>(action: T) => void;
  }>(null as any);

  const Actions = createActions(name, actionSources);
  const createUseState = <T = never>() => () => React.useContext(context).state as T;
  const useActions = createUseActions(context, Actions);

  return { Context: { Provider: context.Provider }, Actions, createUseState, useActions };
};

type ToAction<T> = T extends (...args: infer Arguments) => infer ReturnValue
  ? {
      (...args: Arguments): Action<ReturnValue>;
      match: (action: AnyAction) => action is Action<ReturnValue>;
    }
  : { (): { type: string }; match: (action: AnyAction) => action is Action };

type Action<Payload = any> = Payload extends Object ? { type: string; payload: Payload } : { type: string };

function createActions<T extends ActionMap>(name: string, actionSources: T): ConvertActions<T> {
  return Object.keys(actionSources).reduce(
    (acc, key) => {
      const type = `${name}/${key.toUpperCase()}`;
      const actionCreator = (...args: any[]) => {
        const actionSource = actionSources[key] || (() => ({}));
        return {
          type,
          payload: { ...actionSource(...args) },
        };
      };

      function match(action: AnyAction) {
        return action.type === type;
      }
      actionCreator.match = match;
      return {
        ...acc,
        [key]: actionCreator,
      };
    },
    {} as { [s: string]: any },
  ) as any;
}

type ToDispatcher<T> = T extends (...args: infer Arguments) => any ? (...args: Arguments) => void : () => void;
function createUseActions<
  T extends ActionMap,
  HasDispatchContext extends { dispatch: <T extends AnyAction>(action: T) => void }
>(
  context: React.Context<HasDispatchContext>,
  actions: ConvertActions<T>,
): () => { [P in keyof T]: ToDispatcher<T[P]> } {
  return function useActions() {
    const { dispatch } = React.useContext(context);
    const entries = Object.entries(actions as any);
    return React.useMemo(() => {
      if (dispatch) {
        return entries.reduce(
          (acc, [key, actionCreator]: any) => {
            return {
              ...acc,
              [key]: (...args: any[]) => dispatch(actionCreator(...args)),
            };
          },
          {} as Record<string, any>,
        ) as any;
      } else {
        throw new Error(`target context has not 'dispatch'`);
      }
    }, [dispatch, entries]);
  };
}
