import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    console.log("The entered target value is:", event.target.value);
    setNewName(event.target.value);
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();

    /*
    1. Filter out newName from the persons array (ensure both are lowercase)
    2. If length of returned array isn't 0, show alert and return
    3. otherwise, store person and reset newName
     */

    const existingPeople = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPeople.length > 0) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
    };

    setPersons(persons.concat(newPerson));
    setNewName(""); // Reset newName input field back to empty string
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {/* Rendering notes here */}
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
