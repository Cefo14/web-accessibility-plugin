import {
  useCallback,
  useReducer,
  useState,
} from 'react';

import type { ChangeEventInput } from '@/types/ChangeEvent';
import type { MouseEventButton } from '@/types/MouseEvent';
import { useDidUpdate } from './useDidUpdate';

const FILTERS = {
  brightness: 'brightness',
  contrast: 'contrast',
  saturate: 'saturate',
  sepia: 'sepia',
  hue: 'hue',
  invert: 'invert',
} as const;

const CUSTOM_FILTERS = {
  red: 'red',
  green: 'green',
  blue: 'blue',
  warm: 'warm',
  monochrome: 'monochrome',
};

const ACTION_TYPES = {
  ...FILTERS,
  ...CUSTOM_FILTERS,
  change: 'change',
  reset: 'reset',
} as const;

type ActionType = keyof typeof ACTION_TYPES;

const DEFAULT_STATE = {
  [FILTERS.brightness]: 100,
  [FILTERS.contrast]: 100,
  [FILTERS.saturate]: 100,
  [FILTERS.sepia]: 0,
  [FILTERS.hue]: 0,
};

type State = typeof DEFAULT_STATE;

interface Action {
  type: ActionType;
  payload?: {
    value: number;
  };
}

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  const { value = 0 } = payload ?? {};

  const currentState = {
    ...state,
    hue: DEFAULT_STATE.hue,
  };

  switch (type) {
    case ACTION_TYPES.brightness:
      return {
        ...currentState,
        brightness: value,
      };
    case ACTION_TYPES.contrast:
      return {
        ...currentState,
        contrast: value,
      };
    case ACTION_TYPES.saturate:
      return {
        ...currentState,
        saturate: value,
      };
    case ACTION_TYPES.sepia:
      return {
        ...currentState,
        sepia: value,
      };
    case ACTION_TYPES.hue:
      return {
        ...currentState,
        hue: value,
      };
    case ACTION_TYPES.red:
      return {
        ...DEFAULT_STATE,
        sepia: 100,
        saturate: 500,
        hue: -50,
      };
    case ACTION_TYPES.green:
      return {
        ...DEFAULT_STATE,
        sepia: 100,
        saturate: 500,
        hue: 50,
      };
    case ACTION_TYPES.blue:
      return {
        ...DEFAULT_STATE,
        sepia: 100,
        saturate: 500,
        hue: 150,
      };
    case ACTION_TYPES.warm:
      return {
        ...DEFAULT_STATE,
        brightness: 90,
        sepia: 50,
        saturate: 125,
      };
    case ACTION_TYPES.monochrome:
      return {
        ...DEFAULT_STATE,
        saturate: 0,
      };
    case ACTION_TYPES.reset:
      return { ...DEFAULT_STATE };
    default:
      return state;
  }
};

const EMPTY_STRING = '';

export const useColorFilter = () => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  const [activeCustomFilter, setActiveCustomFilter] = useState(EMPTY_STRING);

  const changeColorFilter = useCallback((event: ChangeEventInput) => {
    const { name, value } = event.target;
    const type = name as ActionType;
    const payload = {
      value: Number(value),
    };
    dispatch({ type, payload });
    setActiveCustomFilter(EMPTY_STRING);
  }, []);

  const toggleCustomColorFilter = useCallback((event: MouseEventButton) => {
    const { name } = event.currentTarget;
    const type = name as ActionType;
    dispatch({ type });
    setActiveCustomFilter(name);
  }, []);

  const resetColorFilter = useCallback(() => {
    dispatch({ type: ACTION_TYPES.reset });
    setActiveCustomFilter(EMPTY_STRING);
  }, []);

  const isCustomFilterActive = useCallback((filter: string) => (
    activeCustomFilter === filter
  ), [activeCustomFilter]);

  useDidUpdate(() => {
    const filter = [
      `brightness(${state.brightness}%)`,
      `contrast(${state.contrast}%)`,
      `saturate(${state.saturate}%)`,
      `sepia(${state.sepia}%)`,
      `hue-rotate(${state.hue}deg)`,
    ].join(' ');
    document.documentElement.style.setProperty('filter', filter);
  }, [state]);

  return {
    actions: ACTION_TYPES,
    filters: state,
    changeColorFilter,
    toggleCustomColorFilter,
    resetColorFilter,
    isCustomFilterActive,
  };
};
