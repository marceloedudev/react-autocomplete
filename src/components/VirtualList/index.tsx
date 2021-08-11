import { Item, ListEl } from './styles';

import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useAutoComplete } from '../../contexts/useAutoComplete';

type IVirtualList = {
  itemContent: (item: any, index: number) => any;
  refList: React.MutableRefObject<any>;
  refScrollEl: React.MutableRefObject<any>;
  heightList?: string;
};

export const VirtualList: React.FC<IVirtualList> = ({ itemContent, refList, refScrollEl, heightList }) => {
  const { state } = useAutoComplete();

  if (!state.showSuggestions || !state.suggestions?.length) {
    return null;
  }

  return (
    <div ref={refList} id={`auto-complete-base`} className="autocomplete-virtual-items">
      <Virtuoso
        id="virtual"
        ref={refScrollEl}
        style={{
          height: heightList || '250px',
          overflowY: 'auto',
        }}
        components={
          {
            Item: React.forwardRef((props, ref) => {
              return <Item {...props} ref={ref} />;
            }),
            List: React.forwardRef((props, ref) => {
              return <ListEl {...props} ref={ref} />;
            }),
          } as any
        }
        className="virtual-list"
        data={state.suggestions}
        itemContent={itemContent}
      />
    </div>
  );
};
