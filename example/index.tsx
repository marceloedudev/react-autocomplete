import 'react-app-polyfill/ie11';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AutoComplete from '../dist';

const dataList = Array.from(new Array(10000))
  .map((_, index) => {
    return {
      id: index + 1,
      name: (Math.random() + 1).toString(36).substring(2),
    };
  })
  .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));

const App = () => {
  const [stateValue, setStateValue] = React.useState<any>(null);
  const [stateInput, setStateInput] = React.useState<any>({
    userid: 0,
  });

  return (
    <>
      <AutoComplete
        name="user_id"
        label="Users"
        itemLabel="name"
        itemValue="id"
        items={dataList}
        value={stateValue}
        onSelected={({ value }) => setStateValue(value)}
      />

      <input
        name="userid"
        type="text"
        value={stateInput.userid}
        placeholder="type userid"
        onChange={event =>
          setStateInput({
            [event.target.name]: event.target.value,
          })
        }
      />

      <button type="button" onClick={() => setStateValue(+stateInput.userid)}>
        Save
      </button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
