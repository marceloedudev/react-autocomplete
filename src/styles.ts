import styled from 'styled-components';

export interface IContainer {
  width?: number;
  margin?: string;
}

export const Container = styled.div<IContainer>`
  position: relative;
  width: ${({ width }) => width || 15}%;
  margin: ${({ margin }) => margin || 0}px;

  & .autocomplete-label {
    color: #333;
    font-weight: normal;
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  & .autocomplete-content {
    background-color: #eee;
    border-radius: 10px;
    display: flex;
    height: 40px;
    font-size: 12px;

    & input {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 12px;
      background-color: transparent;
      border: none;

      :focus {
        outline: none;
        border: none;
      }
    }

    & .autocomplete-controls {
      cursor: pointer;
      display: flex;
      padding: 10px 3px;
      margin-top: 3px;
      position: relative;
      user-select: none;
      z-index: 120;
    }

    & .autocomplete-info-item {
      position: absolute;
      color: #333;
      display: block;
      top: 65px;
      z-index: 100;
      background-color: #fff;
      width: 100%;
      border-radius: 5px;
      box-shadow: 0px 6px 6px 0px rgba(50, 50, 50, 0.3);

      & .content {
        padding: 8px;
      }
    }

    & .autocomplete-virtual-items {
      position: absolute;
      top: 65px;
      z-index: 100;
      background-color: #fff;
      width: 100%;
      border-radius: 5px;

      & .virtual-list {
        box-shadow: 0px 6px 6px 0px rgba(50, 50, 50, 0.3);
      }
    }
  }
`;
