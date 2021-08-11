import React from 'react';
import { useAutoComplete } from '../../contexts/useAutoComplete';

type ILoading = {
  loading: boolean;
  loadingMessage?: string;
};

export const Loading: React.FC<ILoading> = ({ loading, loadingMessage }) => {
  const { state } = useAutoComplete();

  if (!state.showSuggestions || !loading) {
    return null;
  }

  return (
    <div className="autocomplete-info-item autocomplete-items">
      <div className="content">{loadingMessage || 'Loading'}</div>
    </div>
  );
};
