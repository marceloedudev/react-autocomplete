import styled from 'styled-components';

interface ISelectItem {
  selected?: boolean;
  active?: boolean;
}

export const SelectItem = styled.div<ISelectItem>`
  color: #333;
  display: block;
  cursor: pointer;

  ${({ selected }) => selected && `background: #dbd8d7;`}
  ${({ active }) => active && `background: #e8e6e4;`}

  .content {
    padding: 9px;
  }

  &:hover {
    background-color: #f5f1f0;
  }
`;
