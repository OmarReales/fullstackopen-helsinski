import Person from "./Person";

const PersonList = ({ persons, onDelete }) => {
  if (persons.length === 0) {
    return <p className="empty-message">No contacts found</p>;
  }

  return (
    <div className="person-list">
      {persons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          phone={person.number}
          onDelete={() => onDelete(person.id, person.name)}
        />
      ))}
    </div>
  );
};

export default PersonList;
