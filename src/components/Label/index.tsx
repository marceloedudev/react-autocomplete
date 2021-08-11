import React from 'react';

type ILabel = {
  text?: string | undefined;
};

export const Label: React.FC<ILabel> = ({ text }) => {
  if (!text) {
    return null;
  }

  return <label className="autocomplete-label">{text}</label>;
};
