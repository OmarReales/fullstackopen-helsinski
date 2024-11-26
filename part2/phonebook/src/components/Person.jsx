const Person = ({ name, phone, onDelete }) => {
  return (
    <div className="person-item">
      <div className="person-info">
        <div className="person-name">{name}</div>
        <div className="person-phone">{phone}</div>
      </div>
      <button onClick={onDelete} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default Person;
