import React, { InputHTMLAttributes } from 'react';

import { useAutoComplete } from '../../contexts/useAutoComplete';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  placeholder?: string;
  ref?: any;
}

export const Input: React.FC<IInput> = React.forwardRef((props, ref: any) => {
  const { state } = useAutoComplete();

  const { disabled, name, placeholder } = props;

  return (
    <input
      className="input"
      autoComplete="off"
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      name={name}
      value={state.valueInput}
      ref={ref}
      {...props}
    />
  );
});
