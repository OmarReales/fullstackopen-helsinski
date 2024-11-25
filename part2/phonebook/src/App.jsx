import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        showMessage("Error loading contacts", "error");
        console.error(error);
      });
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newName.trim() || !newPhone.trim()) {
      showMessage("Please fill in both name and phone number", "error");
      return;
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the old number with the new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newPhone };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewPhone("");
            showMessage(`Updated ${returnedPerson.name}'s number`);
          })
          .catch((error) => {
            showMessage(`Error updating ${newName}'s number`, "error");
            console.error(error);
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newPhone,
    };

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewPhone("");
        showMessage(`Added ${returnedPerson.name}`);
      })
      .catch((error) => {
        showMessage("Error adding contact", "error");
        console.error(error);
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showMessage(`Deleted ${name}`);
        })
        .catch((error) => {
          showMessage(`Error deleting ${name}`, "error");
          console.error(error);
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Phonebook</h1>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <Filter
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      <PersonForm
        newName={newName}
        newPhone={newPhone}
        onNameChange={(e) => setNewName(e.target.value)}
        onPhoneChange={(e) => setNewPhone(e.target.value)}
        onSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
