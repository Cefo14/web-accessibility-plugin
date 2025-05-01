/* eslint-disable no-case-declarations */
import {
  useCallback,
  useReducer,
} from 'react';

import type { Mirror } from '@/types/Mirror';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';

import { useDidUpdate } from './useDidUpdate';

type Filter = 'brightness' | 'contrast' | 'saturate' | 'sepia' | 'hue' | 'invert';

const FILTERS: Mirror<Filter> = {
  brightness: 'brightness',
  contrast: 'contrast',
  saturate: 'saturate',
  sepia: 'sepia',
  hue: 'hue',
  invert: 'invert',
} as const;

type CustomFilter = 'red' | 'green' | 'blue' | 'warm' | 'monochrome';

const CUSTOM_FILTERS: Mirror<CustomFilter> = {
  red: 'red',
  green: 'green',
  blue: 'blue',
  warm: 'warm',
  monochrome: 'monochrome',
} as const;

const ALL_FILTERS = {
  ...FILTERS,
  ...CUSTOM_FILTERS,
} as const;

export type ColorFilters = typeof ALL_FILTERS;

export type ColorFiltersState = {
  [FILTERS.brightness]: number;
  [FILTERS.contrast]: number;
  [FILTERS.saturate]: number;
  [FILTERS.sepia]: number;
  [FILTERS.hue]: number;
  customFilterSelected?: CustomFilter,
};

const INITIAL_STATE: ColorFiltersState = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  sepia: 0,
  hue: 0,
  customFilterSelected: undefined,
};

const ACTIONS = {
  SET_FILTER: 'SET_FILTER',
  SELECT_CUSTOM_FILTER: 'SELECT_CUSTOM_FILTER',
  RESET: 'RESET',
} as const;

interface Action {
  type: keyof typeof ACTIONS;
  payload?: {
    filter?: Filter;
    customFilter?: CustomFilter;
    value?: number;
  };
}

const CUSTOM_FILTER_VALUES: Record<PropertyKey, ColorFiltersState> = {
  red: {
    ...INITIAL_STATE,
    customFilterSelected: 'red',
    sepia: 100,
    saturate: 500,
    hue: -50,
  },
  green: {
    ...INITIAL_STATE,
    customFilterSelected: 'green',
    sepia: 100,
    saturate: 500,
    hue: 50,
  },
  blue: {
    ...INITIAL_STATE,
    customFilterSelected: 'blue',
    sepia: 100,
    saturate: 500,
    hue: 150,
  },
  warm: {
    ...INITIAL_STATE,
    customFilterSelected: 'warm',
    brightness: 90,
    sepia: 50,
    saturate: 125,
  },
  monochrome: {
    ...INITIAL_STATE,
    customFilterSelected: 'monochrome',
    saturate: 0,
  },
} as const;

const reducer = (state: ColorFiltersState, action: Action): ColorFiltersState => {
  const { type, payload } = action;
  const { filter, customFilter, value } = payload ?? {};

  switch (type) {
    case ACTIONS.SET_FILTER:
      if (filter === undefined) return state;
      return {
        ...state,
        customFilterSelected: undefined,
        [filter]: value,
      };
    case ACTIONS.SELECT_CUSTOM_FILTER:
      if (customFilter === undefined) return state;
      return CUSTOM_FILTER_VALUES[customFilter];
    case ACTIONS.RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const useColorFilter = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setColorFilter = useCallback((name: string, value: string) => {
    if (!hasOwnProperty(FILTERS, name)) throw new Error('Invalid filter');
    dispatch({
      type: ACTIONS.SET_FILTER,
      payload: {
        filter: name,
        value: Number(value),
      },
    });
  }, []);

  const selectCustomColorFilter = useCallback((name: string) => {
    if (!hasOwnProperty(CUSTOM_FILTERS, name)) throw new Error('Invalid custom filter');
    dispatch({
      type: ACTIONS.SELECT_CUSTOM_FILTER,
      payload: {
        customFilter: name,
      },
    });
  }, []);

  const resetColorFilter = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

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
    colorFilters: ALL_FILTERS,
    colorfiltersState: state,
    setColorFilter,
    selectCustomColorFilter,
    resetColorFilter,
  };
};
