import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handeSubmit = (e) => {
    e.preventDefault();

    if (!newName.trim() || !newNumber.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ]);
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <label>Search contacts: </label>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <form onSubmit={handeSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <label>Number: </label>
          <input
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add contact</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person, i) => (
        <div key={i}>
          <p>
            {person.name} {person.number}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
