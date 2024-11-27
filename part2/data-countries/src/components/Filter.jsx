const Filter = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <label htmlFor="search">Find countries: </label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Filter;
