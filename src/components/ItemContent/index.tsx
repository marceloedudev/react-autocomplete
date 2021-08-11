import React from 'react';
import { SelectItem } from './styles';
import { useAutoComplete } from '../../contexts/useAutoComplete';

type IItemContent = {
  index: number;
  item: any;
  onClick: (item: React.MouseEvent<any>) => void;
  itemValue: string;
  itemLabel: string;
};

export const ItemContent: React.FC<IItemContent> = ({ index, item, onClick, itemValue, itemLabel }) => {
  const { state } = useAutoComplete();

  return (
    <>
      <SelectItem
        onClick={() => onClick(item)}
        key={item[itemValue]}
        selected={state.currentSelected?.[itemValue] === item[itemValue]}
        active={state.activeItem === index}
        className="autocomplete-items"
      >
        <div className="content">{item[itemLabel]}</div>
      </SelectItem>
    </>
  );
};
