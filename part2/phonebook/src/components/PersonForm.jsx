const PersonForm = ({
  newName,
  newPhone,
  onNameChange,
  onPhoneChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="person-form">
      <div className="form-group">
        <label className="form-label">Name:</label>
        <input
          type="text"
          value={newName}
          onChange={onNameChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Phone:</label>
        <input
          type="tel"
          value={newPhone}
          onChange={onPhoneChange}
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">
        Add Contact
      </button>
    </form>
  );
};

export default PersonForm;
