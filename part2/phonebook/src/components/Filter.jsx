const Filter = ({ value, onChange }) => {
  return (
    <div>
      <label>Search contacts: </label>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
