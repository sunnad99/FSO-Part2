import { useState, useEffect } from "react";

// importing all components
import Form from "./components/Form";
import Persons from "./components/Persons";

// importing backend services
import personService from "./services/persons";

const Filter = ({ filter, handleFilter }) => {
  //   console.log("Entered Filter component with filter:", filter);

  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilter} />
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) return null;

  const notificationStyle = {
    color: message.isError ? "red" : "green",
    background: "lightgrey",
    borderStyle: "solid",
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notificationStyle}>{message.content}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");
  const [notification, setNotification] = useState(null);

  const personEffectHook = () => {
    console.log("Entered persons effect hook!");

    personService.getAll().then((initialPersons) => {
      console.log("Successfully retrieved data from the server");

      setPersons(initialPersons);
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

    // If there exists a record already, try to update the phone number on the backend server
    // otherwise, just add it to the list
    if (existingPeople.length > 0) {
      const existingPerson = existingPeople[0];
      const newPerson = { ...existingPerson, number: newNumber };

      console.log("A person already exists...", newPerson);
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        console.log(`User has confirmed the update for ${newPerson}`);
        personService
          .update(newPerson.id, newPerson)
          .then((updatedPerson) => {
            console.log(
              "The data is stored to the server with object:",
              updatedPerson
            );

            // Removing the old object and add the updated one
            const filteredList = persons
              .filter((person) => person.id !== newPerson.id)
              .concat(updatedPerson);

            setPersons(filteredList);
            setNewName(""); // Reset newName input field back to empty string
            setNewNumber(""); // Reset newNumber input field back to empty string
            setNotification({
              content: `Changed number for ${newName} to ${newNumber}`,
              isError: false,
            });

            // Remove notification once done
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              content: `Cannot change numbers for ${newName}, their info has already been removed from the server.`,
              isError: true,
            });

            // Remove notification once done
            setTimeout(() => {
              setNotification(null);
            }, 5000);

            // Render only people persisiting on the server
            setPersons(persons.filter((p) => p.id !== newPerson.id));
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      // Update the server with the new note

      personService.create(newPerson).then((returnedPersonObj) => {
        console.log("Successfully stored data to backend server");
        setPersons(persons.concat(returnedPersonObj));
        setNewName(""); // Reset newName input field back to empty string
        setNewNumber(""); // Reset newNumber input field back to empty string
      });

      setNotification({ content: `Added ${newName}`, isError: false });

      // Remove notification once done
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
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
      <Notification message={notification} />
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
      <Persons
        persons={filteredPeople}
        renderPersons={setPersons}
        renderNotification={setNotification}
      />
    </div>
  );
};

export default App;
