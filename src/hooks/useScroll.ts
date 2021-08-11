import React, { useCallback, useEffect } from 'react';

import { useAutoComplete } from '../contexts/useAutoComplete';

type IUseScroll = {
  scrollEl: React.MutableRefObject<any>;
};

export const useScroll = ({ scrollEl }: IUseScroll) => {
  const { state } = useAutoComplete();

  const scrollToIndex = useCallback(
    index => {
      if (scrollEl && scrollEl.current) {
        scrollEl.current.scrollToIndex({
          index,
        });
      }
    },
    [scrollEl]
  );

  useEffect(() => {
    if (state.activeItem == 0) {
      scrollToIndex(0);
    }
  }, [state.activeItem, scrollEl, scrollToIndex]);

  return {
    scrollToIndex,
  };
};
