/* eslint-disable react-hooks/exhaustive-deps */

import { IAutoCompleteSelectedItem } from '..';
import { useAutoComplete } from '../contexts/useAutoComplete';
import { useCallback } from 'react';

type IUseControls = {
  onSelected?: (item: IAutoCompleteSelectedItem) => void;
  resolvedRef: React.MutableRefObject<any>;
};

export const useControls = ({ onSelected, resolvedRef }: IUseControls) => {
  const { state, actions } = useAutoComplete();

  const handleCleanInput = useCallback(() => {
    actions.setValueInput('');
    actions.setShowSuggestions(false);
    actions.setActiveItem(0);
    actions.setCurrentSelected(null);
    if (onSelected) {
      onSelected({
        item: null,
        input: '',
        value: null,
      });
    }
  }, [
    actions.setValueInput,
    actions.setShowSuggestions,
    actions.setCurrentSelected,
    onSelected,
    actions.setActiveItem,
  ]);

  const handleExpand = useCallback(() => {
    actions.setShowSuggestions(!state.showSuggestions);
    if (!state.showSuggestions && resolvedRef) {
      resolvedRef.current.focus();
    }
  }, [resolvedRef, state.showSuggestions, actions.setShowSuggestions]);

  return {
    handleCleanInput,
    handleExpand,
  };
};
