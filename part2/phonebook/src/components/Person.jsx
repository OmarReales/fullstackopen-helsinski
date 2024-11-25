const Person = ({ name, phone, onDelete }) => {
  return (
    <>
      <div>
        {name} {phone} <button onClick={onDelete}>Delete</button>
      </div>
    </>
  );
};

export default Person;
