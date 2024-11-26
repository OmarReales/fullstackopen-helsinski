import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/persons";
import Notification from "./components/Notification";
import { formatErrorMessage } from "./utils/errorHandler";
import {
  handlePersonRemoval,
  handlePersonUpdate,
  findPerson,
} from "./utils/stateManager";

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
        showMessage("Error loading contacts: " + error.message, "error");
      });
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newName.trim() || !newPhone.trim()) {
      showMessage("Please fill in both name and phone number", "error");
      return;
    }

    const existingPerson = findPerson(persons, newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the old number with the new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newPhone };
        try {
          const returnedPerson = await personService.update(
            existingPerson.id,
            updatedPerson
          );
          setPersons(handlePersonUpdate(persons, returnedPerson));
          setNewName("");
          setNewPhone("");
          showMessage(`Updated ${returnedPerson.name}'s number`);
        } catch (error) {
          const errorMessage = formatErrorMessage("updating", newName, error);
          showMessage(errorMessage, "error");
          if (
            error.name === "NotFoundError" ||
            error.response?.status === 404
          ) {
            setPersons(handlePersonRemoval(persons, existingPerson.id));
          }
        }
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newPhone,
    };

    try {
      const returnedPerson = await personService.create(newPerson);
      setPersons([...persons, returnedPerson]);
      setNewName("");
      setNewPhone("");
      showMessage(`Added ${returnedPerson.name}`);
    } catch (error) {
      showMessage(formatErrorMessage("adding", newName, error), "error");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await personService.remove(id);
        setPersons(handlePersonRemoval(persons, id));
        showMessage(`Deleted ${name}`);
      } catch (error) {
        const errorMessage = formatErrorMessage("deleting", name, error);
        showMessage(errorMessage, "error");
        if (error.response?.status === 404) {
          setPersons(handlePersonRemoval(persons, id));
        }
      }
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Phonebook</h1>

      <Notification message={message} />

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
