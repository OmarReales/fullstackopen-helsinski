export const handlePersonUpdate = (persons, updatedPerson) => {
  return persons.map((person) =>
    person.id === updatedPerson.id ? updatedPerson : person
  );
};

export const handlePersonRemoval = (persons, id) => {
  return persons.filter((person) => person.id !== id);
};

export const findPerson = (persons, name) => {
  return persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );
};
