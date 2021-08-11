import { ExpandLessIcon, ExpandMoreIcon } from './styles';

import React from 'react';
import { useAutoComplete } from '../../contexts/useAutoComplete';

type IExpandInput = {
  onClick: (event: React.MouseEvent<any>) => void;
};

export const ExpandInput: React.FC<IExpandInput> = ({ onClick }) => {
  const { state } = useAutoComplete();

  return (
    <div className="autocomplete-controls">
      {state.showSuggestions ? <ExpandLessIcon onClick={onClick} /> : <ExpandMoreIcon onClick={onClick} />}
    </div>
  );
};
