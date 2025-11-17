 
import {
  useCallback,
  useReducer,
} from 'react';

import { hasOwnProperty } from '@/helpers/hasOwnProperty';
import type { ColorFilter } from '@/helpers/ColorFilterUpdater';
import {
  COLOR_FILTERS,
  brightnessUpdater,
  contrastUpdater,
  saturateUpdater,
  sepiaUpdater,
  hueRotateUpdater,
} from '@/helpers/ColorFilterUpdater';
import type { ColorFilterSettings, ColorFilterSetting } from '@/helpers/ColorFilterSettings';
import { COLOR_FILTER_SETTING_NAMES, COLOR_FILTER_SETTINGS } from '@/helpers/ColorFilterSettings';

import { InvalidPropError } from '@/errors/InvalidPropError';

import { useDidUpdate } from './useDidUpdate';

const ACTIONS = {
  SET_FILTER: 'SET_FILTER',
  SELECT_CUSTOM_FILTER: 'SELECT_CUSTOM_FILTER',
} as const;

interface Action {
  type: keyof typeof ACTIONS;
  payload?: {
    filter?: ColorFilter;
    customFilter?: ColorFilterSetting;
    value?: number;
  };
}

export type ColorFilterState = ColorFilterSettings & {
  customFilterSelected?: ColorFilterSetting;
};

const INITIAL_STATE: ColorFilterState = {
  ...COLOR_FILTER_SETTINGS.base,
  customFilterSelected: undefined,
};

const reducer = (state: ColorFilterState, action: Action): ColorFilterState => {
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
      return {
        ...COLOR_FILTER_SETTINGS[customFilter],
        customFilterSelected: customFilter,
      };
    default:
      return state;
  }
};

export const useColorFilter = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setColorFilter = useCallback((name: string, value: string) => {
    if (!hasOwnProperty(COLOR_FILTERS, name)) throw new InvalidPropError(`Invalid filter "${name}"`);
    dispatch({
      type: ACTIONS.SET_FILTER,
      payload: {
        filter: name,
        value: Number(value),
      },
    });
  }, []);

  const selectCustomColorFilter = useCallback((name: string) => {
    if (!hasOwnProperty(COLOR_FILTER_SETTINGS, name)) throw new InvalidPropError(`Invalid custom filter "${name}"`);
    dispatch({
      type: ACTIONS.SELECT_CUSTOM_FILTER,
      payload: {
        customFilter: name,
      },
    });
  }, []);

  const resetColorFilter = useCallback(() => {
    dispatch({
      type: ACTIONS.SELECT_CUSTOM_FILTER,
      payload: {
        customFilter: COLOR_FILTER_SETTING_NAMES.base,
      },
    });
  }, []);

  useDidUpdate(() => {
    brightnessUpdater.update(document.documentElement, state.brightness);
    contrastUpdater.update(document.documentElement, state.contrast);
    saturateUpdater.update(document.documentElement, state.saturate);
    sepiaUpdater.update(document.documentElement, state.sepia);
    hueRotateUpdater.update(document.documentElement, state['hue-rotate']);
  }, [state]);

  return {
    colorfilterState: state,
    setColorFilter,
    selectCustomColorFilter,
    resetColorFilter,
  };
};
