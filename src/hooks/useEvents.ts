/* eslint-disable react-hooks/exhaustive-deps */

import { DOWN_KEYCODE, ENTER_KEYCODE, UP_KEYCODE } from '../constants';
import React, { useCallback } from 'react';

import { IAutoCompleteSelectedItem } from '..';
import { useAutoComplete } from '../contexts/useAutoComplete';

type IUseEvents = {
  onSelected?: (item: IAutoCompleteSelectedItem) => void;
  itemLabel: string;
  itemValue: string;
  onChange?: (item: React.ChangeEvent<any>) => void;
  scrollToIndex: (index: number) => void;
  resolvedRef: React.MutableRefObject<any>;
};

export const useEvents = ({ onSelected, itemLabel, itemValue, onChange, scrollToIndex, resolvedRef }: IUseEvents) => {
  const { state, actions } = useAutoComplete();

  const onItemSelected = useCallback(
    item => {
      if (item) {
        const valueText = item[itemLabel];
        if (onSelected) {
          onSelected({
            item: item,
            input: valueText,
            value: item[itemValue],
          });
        }
        actions.setValueInput(valueText);
        actions.setShowSuggestions(false);

        actions.setCurrentSelected(item);
      }
    },
    [itemLabel, onSelected, itemValue]
  );

  const handleClickItem = useCallback(
    item => {
      onItemSelected(item);
    },
    [onItemSelected]
  );

  const handleChange = useCallback(
    event => {
      actions.setValueInput(event.target.value);

      if (onChange) {
        onChange(event);
      }

      actions.setShowSuggestions(true);
      actions.setActiveItem(0);
    },
    [actions.setValueInput, actions.setShowSuggestions, onChange, actions.setActiveItem]
  );

  const handleFocus = useCallback(() => {
    actions.setShowSuggestions(!state.showSuggestions);
    if (!state.showSuggestions && resolvedRef) {
      resolvedRef.current.focus();
    }
  }, [resolvedRef, state.showSuggestions]);

  const handleBlur = useCallback(
    event => {
      if (event.relatedTarget) {
        return;
      }
      actions.setShowSuggestions(false);
      actions.setActiveItem(0);
    },
    [actions.setShowSuggestions, actions.setActiveItem]
  );

  const handleKeyDown = useCallback(
    event => {
      if (resolvedRef && resolvedRef.current !== document.activeElement) {
        return;
      }

      if (event.keyCode === ENTER_KEYCODE) {
        event.preventDefault();

        onItemSelected(state.suggestions[state.activeItem]);
        actions.setActiveItem(0);
      } else if (event.keyCode === UP_KEYCODE) {
        if (state.activeItem === 0) {
          return;
        }

        const idActive = state.activeItem - 1;

        if (state.activeItem < state.suggestions.length) {
          scrollToIndex(idActive);
        }

        actions.setActiveItem(idActive);
      } else if (event.keyCode === DOWN_KEYCODE) {
        if (state.suggestions.length === 1 || state.activeItem - 1 === state.suggestions.length) {
          return;
        }

        const indexActive =
          state.activeItem + 1 > state.suggestions.length - 1 ? state.activeItem : state.activeItem + 1;

        actions.setActiveItem(indexActive);

        scrollToIndex(indexActive);
      }
    },
    [resolvedRef, state.suggestions, state.activeItem, onItemSelected, scrollToIndex]
  );

  return {
    onItemSelected,
    handleClickItem,
    handleChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
  };
};
