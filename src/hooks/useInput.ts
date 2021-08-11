/* eslint-disable react-hooks/exhaustive-deps */

import { useAutoComplete } from '../contexts/useAutoComplete';
import { useEffect } from 'react';

type IUseInput = {
  items: any[];
  value: any;
  itemLabel: string;
  itemValue: string;
  handleCleanInput: () => void;
  onItemSelected: (item: any) => void;
};

export const useInput = ({ items, value, itemLabel, itemValue, handleCleanInput, onItemSelected }: IUseInput) => {
  const { state, actions } = useAutoComplete();

  useEffect(() => {
    if (state.valueInput?.length > 0) {
      const filteredItems = items.filter(
        item => item[itemLabel].toLowerCase().indexOf(state.valueInput.toLowerCase()) > -1
      );

      actions.setSuggestions(filteredItems);
    } else {
      actions.setSuggestions(items);
      actions.setShowSuggestions(false);
      actions.setCurrentSelected(null);
    }
  }, [items, state.valueInput, itemLabel]);

  useEffect(() => {
    if ((!value && !items?.length) || !value) {
      handleCleanInput();
      return;
    }

    if (items?.length > 0) {
      const exists = items.find(item => item[itemValue] === value);

      onItemSelected(exists);
    }
  }, [value, items, handleCleanInput, onItemSelected, itemValue]);
};
