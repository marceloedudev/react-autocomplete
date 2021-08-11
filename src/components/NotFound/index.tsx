import React from 'react';
import { useAutoComplete } from '../../contexts/useAutoComplete';

type INotFound = {
  emptyListMessage: string | undefined;
};

export const NotFound: React.FC<INotFound> = ({ emptyListMessage }) => {
  const { state } = useAutoComplete();

  if (!state.showSuggestions || state.suggestions?.length > 0) {
    return null;
  }

  return (
    <div className="autocomplete-info-item autocomplete-items">
      <div className="content">{emptyListMessage || 'No items found'}</div>
    </div>
  );
};
