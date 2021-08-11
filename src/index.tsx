import React, { useRef } from 'react';

import { AutoCompleteProvider } from './contexts/useAutoComplete';
import { CleanInput } from './components/CleanInput';
import { Container } from './styles';
import { ExpandInput } from './components/ExpandInput';
import { Input } from './components/Input';
import { ItemContent } from './components/ItemContent';
import { Label } from './components/Label';
import { Loading } from './components/Loading';
import { NotFound } from './components/NotFound';
import { VirtualList } from './components/VirtualList';
import { useControls } from './hooks/useControls';
import { useEvents } from './hooks/useEvents';
import { useInput } from './hooks/useInput';
import { useScroll } from './hooks/useScroll';

export interface IAutoCompleteSelectedItem {
  item: any;
  input: string;
  value: string | number | null;
}

interface IAutoComplete {
  label?: string;
  name: string;
  value?: string | number | null;
  items: any[];
  itemLabel: string;
  itemValue: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (item: React.ChangeEvent<any>) => void;
  onSelected?: (item: IAutoCompleteSelectedItem) => void;
  emptyListMessage?: string;
  loadingMessage?: string;
  heightList?: string;
  width?: number;
  margin?: string;
  loading?: boolean;
  ref?: any;
}

const MakeAutoComplete: React.FC<IAutoComplete> = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    value,
    items,
    itemLabel,
    itemValue,
    placeholder,
    disabled,
    onChange,
    onSelected,
    emptyListMessage,
    loading,
    loadingMessage,
    width,
    margin,
    heightList,
  } = props;

  const resolvedRef: any = ref;

  const scrollEl = useRef<any>(null);

  const refList = useRef<any>(null);

  const { handleCleanInput, handleExpand } = useControls({
    onSelected,
    resolvedRef,
  });

  const { scrollToIndex } = useScroll({ scrollEl });

  const { onItemSelected, handleClickItem, handleChange, handleFocus, handleBlur, handleKeyDown } = useEvents({
    onSelected,
    itemLabel,
    itemValue,
    onChange,
    scrollToIndex,
    resolvedRef,
  });

  useInput({
    items,
    value,
    itemLabel,
    itemValue,
    handleCleanInput,
    onItemSelected,
  });

  return (
    <>
      <Container width={width} margin={margin}>
        {label && <label className="autocomplete-label">{label}</label>}

        <Label text={label} />

        <div className="autocomplete-content">
          <Input
            disabled={disabled}
            name={name}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={resolvedRef}
          />

          <CleanInput onClick={() => handleCleanInput()} />

          <ExpandInput onClick={() => handleExpand()} />

          <Loading loading={!!loading} loadingMessage={loadingMessage} />

          <NotFound emptyListMessage={emptyListMessage} />

          <VirtualList
            heightList={heightList}
            itemContent={(index, item) => (
              <ItemContent
                index={index}
                item={item}
                onClick={() => handleClickItem(item)}
                itemValue={itemValue}
                itemLabel={itemLabel}
              />
            )}
            refList={refList}
            refScrollEl={scrollEl}
          />
        </div>
      </Container>
    </>
  );
});

const AutoComplete: React.FC<IAutoComplete> = React.forwardRef((props, ref) => {
  const defaultRef = useRef();

  const resolvedRef: any = ref || defaultRef;

  return (
    <AutoCompleteProvider>
      <MakeAutoComplete {...props} ref={resolvedRef} />
    </AutoCompleteProvider>
  );
});

export default AutoComplete;
