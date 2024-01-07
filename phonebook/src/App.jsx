import { useState, useEffect } from "react";
import axios from "axios";

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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");

  const personEffectHook = () => {
    console.log("Entered persons effect hook!");

    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("Successfully retrieved data from the server");

      setPersons(response.data);
    });
  };

  // Retrieving data from a server
  useEffect(personEffectHook, []);

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

    // Update the server with the new note

    axios.post("http://localhost:3001/persons", newPerson).then((response) => {
      console.log("Successfully stored data to backend server");
      setPersons(persons.concat(response.data));
      setNewName(""); // Reset newName input field back to empty string
      setNewNumber(""); // Reset newNumber input field back to empty string
    });
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
