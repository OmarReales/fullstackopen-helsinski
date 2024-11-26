const Filter = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={onSearchChange}
        className="search-input"
      />
    </div>
  );
};

export default Filter;
