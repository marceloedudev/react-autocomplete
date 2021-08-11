import { CleanIcon } from './styles';
import React from 'react';
import { useAutoComplete } from '../../contexts/useAutoComplete';

type ICleanInput = {
  onClick: (event: React.MouseEvent<any>) => void;
};

export const CleanInput: React.FC<ICleanInput> = ({ onClick }) => {
  const { state } = useAutoComplete();

  if (!state.currentSelected) {
    return null;
  }

  return (
    <div className="autocomplete-controls">
      <CleanIcon onClick={onClick} />
    </div>
  );
};
