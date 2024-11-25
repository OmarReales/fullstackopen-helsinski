const PersonForm = ({
  handeSubmit,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handeSubmit}>
      <div>
        <label>Name: </label>
        <input type="text" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <label>Number: </label>
        <input type="text" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add contact</button>
      </div>
    </form>
  );
};

export default PersonForm;
