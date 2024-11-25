const Filter = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <label>Search contacts: </label>
      <input value={searchTerm} onChange={onSearchChange} />
    </div>
  );
};

export default Filter;
