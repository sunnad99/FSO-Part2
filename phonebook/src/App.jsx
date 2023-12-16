import { useState } from "react";

import Form from "./components/Form";
import Persons from "./components/Persons";

const Filter = ({ filter, handleFilter }) => {
  //   console.log("Entered Filter component with filter:", filter);

  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilter} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");

  const handleNameChange = (event) => {
    console.log("The entered name is:", event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log("The entered phone number is:", event.target.value);
    setNewNumber(event.target.value);
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
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
    setNewName(""); // Reset newName input field back to empty string
    setNewNumber(""); // Reset newNumber input field back to empty string
  };

  const handleFilter = (event) => {
    setfilter(event.target.value);
  };

  // Obtain all the people based on the filter
  const filteredPeople = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  // Setting input fields in a proper data structure for Form component
  const inputFields = [
    {
      id: 1,
      name: "name",
      value: newName,
      eventHandler: handleNameChange,
    },
    {
      id: 2,
      name: "number",
      value: newNumber,
      eventHandler: handleNumberChange,
    },
  ];

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />

      {/* Form to enter user data */}
      <h2>add a new</h2>
      <Form
        submitText="add"
        submitCallback={handlePersonSubmit}
        inputFields={inputFields}
      />

      {/* Rendering people info here */}
      <h2>Numbers</h2>
      <Persons persons={filteredPeople} />
    </div>
  );
};

export default App;
