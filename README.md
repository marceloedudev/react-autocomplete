# React Auto Complete

### Example:

```tsx
const dataList = [
  {
    id: 1,
    name: 'Username',
  },
];

const [stateValue, setStateValue] = React.useState(null);

<AutoComplete
  name="user_id"
  label="Users"
  itemLabel="name"
  itemValue="id"
  items={dataList}
  value={stateValue}
  onSelected={({ value }) => setStateValue(value)}
/>;
```
