import Person from "./Person";
const PersonList = ({ persons }) => {
  if (persons.length === 0) {
    return <p>No contacts found</p>;
  }
  return (
    <div>
      {persons.map((person, i) => (
        <Person key={i} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default PersonList;
